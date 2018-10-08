import csv
from datetime import datetime
import numpy as np

# class for doing SQL-like operations on a TSV spreadsheet with a header row
# Table instances are immutable so long as you do not access properties directly
# add methods as needed
class Table:
    def __init__(self, headers, rows, validate=True):
        self.headers = headers
        self.rows = rows
        if validate:
            assert(self.check_rep())

    # create a table by reading a TSV file
    @classmethod
    def from_tsv_file(cls, tsv_file_name):
        headers = []
        rows = []
        with open(tsv_file_name) as tsvfile:
            reader = csv.reader(tsvfile, delimiter='\t')
            first_row = True
            for row in reader:
                if first_row:
                    headers = row
                    first_row = False
                else:
                    rows.append(row)
        return cls(headers, rows, True)

    # create a table by joining tables vertically
    # requires them to have the same headers
    @classmethod
    def from_tables_stack(cls, tables):
        headers = tables[0].headers[:]
        assert(all(t.headers == headers for t in tables))
        rows = []
        for table in tables:
            for row in table.rows:
                rows.append(row)
        return cls(headers, rows)

    # return true if this object's data is not corrupted, false otherwise
    def check_rep(self):
        for row in self.rows:
            if len(row) != len(self.headers):
                return False
        return True

    # get only the rows of this table for which a specific column passes a test
    # column_header -- name of column in question
    # test -- takes cell value, returns true or false
    def where_col(self, column_header, test):
        i = self.headers.index(column_header)
        return Table(self.headers[:], list(filter(lambda r: test(r[i]), self.rows)), False)

    # get only the rows of this table that pass a test
    # test -- takes a row, returns true or false
    def where_row(self, test):
        return Table(self.headers[:], list(filter(test, self.rows)), False)

    # get only the rows of this table containing the first occurence of each unique set of values
    # for the specified columns
    def where_cols_unique(self, cols):
        indexes = list(map(lambda c: self.headers.index(c), cols))
        rows = []
        keys = set()
        for row in self.rows:
            key = ','.join(map(lambda i: row[i], indexes))
            if key not in keys:
                rows.append(row)
                keys.add(key)
        return Table(self.headers[:], rows)

    # get a column of the table as a list
    def get_col(self, column_header):
        i = self.headers.index(column_header)
        col = []
        for row in self.rows:
            col.append(row[i])
        return col

    # to TSV
    def __repr__(self):
        return '\t'.join(self.headers) + '\n' + '\n'.join(map(lambda r: '\t'.join(r), self.rows))


# load experiment data
all_data = Table.from_tsv_file('data.tsv').where_row(lambda r: all(len(c) > 0 for c in r))

# ignore logs from tests done before the experiment
date_format = '%m/%d/%Y %H:%M:%S'
exp_start = datetime.strptime('9/29/2018 00:00:00', date_format)
exp_data = all_data.where_col('Timestamp', lambda t: datetime.strptime(t, date_format) > exp_start)

# skip first 5 trials to avoid 'warm up' effects
skip_first_n = 5
exp_data_no_warmups = exp_data.where_col('trial', lambda t: int(t) >= skip_first_n) # trials are zero-indexed

# separate data by participant
participants = set(exp_data_no_warmups.get_col('participant'))
data_by_participant = {}
for participant in participants:
    participant_data = exp_data_no_warmups.where_col('participant', lambda p: p == participant)
    # it seems some people hit back during the experiment...just use their first try at each trial
    participant_data_no_dups = participant_data.where_cols_unique(['ephemeral', 'block', 'trial'])
    # only use data if they did all of the trials
    if len(participant_data_no_dups.rows) == (252 - skip_first_n * 4): # 4 blocks
        data_by_participant[participant] = participant_data_no_dups

# calculate overall avg & sd
usable_data = Table.from_tables_stack(list(data_by_participant.values()))
all_times = np.array(list(map(lambda e: int(e), usable_data.get_col('elapsed'))))
overall_avg = np.mean(all_times)
overall_sd = np.std(all_times)

# analyze by participant x condition

# data for output table
summary_headers = ['participant', 'accuracy', 'ephemeral', 'mean', 'meadian', 'SD', 'errRate']
summary_rows = []

def analyze_participant_data(paricipant_data):
    participant = paricipant_data.get_col('participant')[0]
    accuracy = paricipant_data.get_col('accuracy')[0]
    for ephemeral in ['TRUE', 'FALSE']:
        data_condition = paricipant_data.where_col('ephemeral', lambda e: e == ephemeral)
        times = np.array(list(map(lambda e: int(e), data_condition.get_col('elapsed'))))
        # throw out trials more than 2 SD from mean (we assume they got distracted)
        times_no_outliers = np.extract(np.abs(times - overall_avg) <= 2 * overall_sd, times)
        avg = np.mean(times_no_outliers)
        med = np.median(times_no_outliers)
        sd = np.std(times_no_outliers)
        err_rate = len([m for m in data_condition.get_col('mistakes') if int(m) > 0]) / len(data_condition.rows)
        summary_rows.append([participant, accuracy, ephemeral, str(avg), str(med), str(sd), str(err_rate)])

for participant, data in data_by_participant.items():
    analyze_participant_data(data)

print(Table(summary_headers, summary_rows)) # writes TSV to stdout so you can save to a file
