# Drag-Queen-Name-Generator-Final-Project
Using as many names of working drag queens from around the world, I've written an program to give the user a randomly generated drag name.

I developed a model with both LSTM and SimpleRNN layers. I converted each name into a vector at the character-level using tokenization and padding. I then split the vectors into data and labels, aka character strings and their respective following character. So, given the name "Alaska", one of the corresponding vector/label pairs would be: ['a','l','a','s','k'], ['a']. 

After the model was trained and saved, I wrote a function to generate names. Before tokenization, I added ' ' to the beggining of each name. The function takes ' ' as a seed value, feeds it to the model to predict the likelihood of any possible following character, and picking one at random with those probabilities. It then continues this process, randomly choosing the next character based on the previous characters.

I then predicted 6000 names and put them into a csv file. I tried to convert the saved model to .json file using the tfjs-converter and load it into a .js file, but the loaded model did not predict anything like it did in jupyter notebook. So, for the web app, I just used the 6000 generated names, and picked them at random. Not what I wanted to do, but I wanted to get the app working in some way.

Hope you enjoy!