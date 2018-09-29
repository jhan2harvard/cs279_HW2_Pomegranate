# Ephemeral Adaptation

Experiment replication for COMPSCI 279 Hw 2.

## Authors
- [Ellie Jungmin Han](https://github.com/jhan2harvard)
- [Hailey James](https://github.com/hljames)
- [Barry McNamara](https://github.com/bamazap)

## Origin
A replication of the experiment described in ["Ephemeral Adaptation: The Use of Gradual Onset to Improve Menu Selection Performance"](https://sigchi.org/conferences/conference-history/chi/chi-2009-details/) presented at [CHI 2009](https://sigchi.org/conferences/) (Conference on Human Factors in Computing Systems) by Leah Findlater, Karyn Moffatt, Joanna McGrenere, and Jessica Dawson from the University of British Columbia.

This work was done for the class [COMPSCI 279](http://cs279.org/) (Research Topics in Human-Computer Interaction) taught at Harvard.

## Credits
- `googlesender.py` - [David Bau](https://gist.github.com/davidbau)

## Configuration
The accuracy condition is randomized initially. To set it manually, open the console and do `localStorage.accuracy = LO_ACC` or `localStorage.accuracy = HI_ACC`. Then refresh the page.

This experiment saves some state in localStorage. To reset this (for testing, or running it multiple times on one machine), do `getBlockNums(true)` and `generateSequences(true)`.
