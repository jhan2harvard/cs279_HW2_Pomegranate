// every group of 4 are related
const experimentWords = ['Belittle', 'Disparage', 'Reprehend', 'Censure', 'Denounce', 'Remonstrate', 'Blame', 'Castigate', 'Condemn', 'Decry', 'Excoriate', 'Deprecate', 'Deride', 'Ridicule', 'Gibe', 'Scoff', 'Quick', 'Crafty', 'Ingenious', 'Brilliant', 'Sharp', 'Intelligent', 'Bright', 'Cunning', 'Sandstone', 'Limestone', 'Marble', 'Slate', 'Tan', 'Gray', 'White', 'Pink', 'Voice', 'Vocal', 'Sound', 'Song', 'Horse', 'Cow', 'Sheep', 'Pig', 'Bird', 'Hamster', 'Mouse', 'Rabbit', 'Fish', 'Dolphin', 'Shark', 'Whale', 'Elephant', 'Lion', 'Tiger', 'Monkey', 'Nap', 'Tired', 'Rest', 'Snooze', 'Armor', 'Shield', 'Defense', 'Guard', 'Happy', 'Cheerful', 'Delighted', 'Ecstatic', 'Carbon', 'Graphite', 'Charcoal', 'Coal', 'Hyena', 'Fox', 'Wolf', 'Coyote', 'Apology', 'Excuse', 'Regret', 'Confession', 'Child', 'Infant', 'Newborn', 'Toddler', 'Horror', 'Comedy', 'Romance', 'Adventure', 'Steel', 'Alloy', 'Aluminum', 'Gold', 'Little', 'Slight', 'Insufficient', 'Meager', 'Creative', 'Imaginative', 'Inventive', 'Innovative', 'Fabric', 'Nylon', 'Linen', 'Weave', 'Cottage', 'Bungalow', 'Mansion', 'Townhouse', 'French', 'Francophone', 'Napoleonic', 'Huguenot', 'Beaver', 'Otter', 'Raccoon', 'Weasel', 'Surgeon', 'Psychologist', 'Pathologist', 'Gynecologist', 'Grape', 'Berry', 'Melon', 'Fig', 'Engine', 'Compressor', 'Exhaust', 'Cylinder', 'Noise', 'Hiss', 'Vibration', 'Distortion', 'Landscape', 'Garden', 'Greenhouse', 'Botanic', 'Chemical', 'Catalysis', 'Radiology', 'Enzymology', 'Early', 'Late', 'Initial', 'Future', 'Western', 'Eastern', 'Northern', 'Southern', 'Pilot', 'Aviator', 'Wingman', 'Starfighter', 'Light', 'Lamp', 'Led', 'Fire', 'Address', 'Email', 'Postcode', 'Mail', 'Elephant', 'Rhinoceros', 'Giraffe', 'Hippopotamus', 'Mountain', 'Canyon', 'Valley', 'Ridge', 'Zoo', 'Safari', 'Wildlife', 'Aquarium', 'Audience', 'Applause', 'Cheer', 'Crowd', 'Hypnosis', 'Telepathy', 'Illusion', 'Supernatural', 'Art', 'Museum', 'Sculpture', 'Gallery', 'Face', 'Hair', 'Neck', 'Head', 'Habit', 'Routine', 'Lifestyle', 'Pattern', 'Plaid', 'Checkered', 'Striped', 'Dotted', 'Royal', 'Majestic', 'Imperial', 'Monarchic', 'Large', 'Big', 'Wide', 'Spacious', 'Fail', 'Lose', 'Fall', 'Crash', 'Daydream', 'Fantasy', 'Wonder', 'Fairytale', 'Frustration', 'Anger', 'Outburst', 'Annoyance', 'Estimate', 'Approximate', 'Assess', 'Speculate', 'Alien', 'Invaders', 'Spaceship', 'Planet', 'Iron', 'Stove', 'Refrigerator', 'Heater', 'Poetic', 'Rhyming', 'Philosophic', 'Aesthetic', 'Jewel', 'Gemstone', 'Charm', 'Crystal', 'Export', 'Import', 'Quota', 'Market', 'Association', 'Society', 'Organization', 'Federation', 'Feeling', 'Sentiment', 'Emotion', 'Sensation', 'Blossom', 'Bloom', 'Spring', 'Flower', 'Grin', 'Smile', 'Laugh', 'Smirk', 'Rubber', 'Latex', 'Silicone', 'Plastic', 'Falcon', 'Hawk', 'Owl', 'Eagle', 'Python', 'Anaconda', 'Cobra', 'Rattlesnake', 'Clever', 'Wise', 'Cute', 'Smart', 'Wealthy', 'Prosperous', 'Substantial', 'Opulent', 'Old', 'Ancient', 'Decrepit', 'Antiquated', 'Scar', 'Blister', 'Crater', 'Defect', 'Hare', 'Rodent', 'Rabbit', 'Buck', 'Neon', 'Glitzy', 'Effulgent', 'Lambent', 'Butcher', 'Barber', 'Blacksmith', 'Shoemaker', 'Force', 'Coercion', 'Fury', 'Dynamism', 'Electric', 'Magnetic', 'Voltaic', 'Motor', 'Code', 'Cipher', 'Cryptography', 'Encryption', 'Whale', 'Orca', 'Dolphin', 'Shark', 'Connection', 'Linkage', 'Correlation', 'Relation', 'Clover', 'Sunflower', 'Daisy', 'Cotton', 'Factual', 'Circumstantial', 'Legitimate', 'Unbiased', 'Expert', 'Master', 'Guru', 'Mentor', 'Sphere', 'Radius', 'Ellipsoid', 'Torus', 'Daughter', 'Girl', 'Woman', 'Female', 'Breath', 'Inhale', 'Exhale', 'Gasp', 'Kitten', 'Puppy', 'Cub', 'Pony', 'Treasure', 'Pirate', 'Chest', 'Quest', 'Almond', 'Peanut', 'Walnut', 'Chestnut'];
const wordGroups = [];
for (let i = 0; i < experimentWords.length - 3; i += 4) {
  wordGroups.push(experimentWords.slice(i, i + 4));
}

function getSubmenuWords() {
  const submenus = [];

  const usedGroups = new Set();
  const getRandomGroup = () => {
    let groupIdx;
    do {
      groupIdx = randint(wordGroups.length);
    } while (usedGroups.has(groupIdx));
    return wordGroups[groupIdx];
  };

  for (let m = 0; m < 3; m += 1) {
    const submenu = {
      title: `Menu ${m}`,
      items: [],
    };

    for (let g = 0; g < 4; g += 1) {
      const group = getRandomGroup();
      group.forEach((word, w) => {
        const item = {
          name: word,
        };
        submenu.items.push(item);
      });
    }
    submenus.push(submenu);
  }
  return submenus;
}
