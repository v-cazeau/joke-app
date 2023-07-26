import { StatusBar } from "expo-status-bar"; //what does this do?
import { useEffect, useState, Fragment } from "react"; //what is the fragment ___ for?
import { Text, View, TouchableOpacity } from "react-native"; //double check but Touchable opacity is how you click on a button in react
import { styles } from "./src/styles"; //imports the styling of the app
import { shuffle } from "./src/utilis"; //imports

export default function App() {
  const [jokes, setJokes] = useState(); //Holds the array of jokes
  const [i, setI] = useState(0); //current joke
  const [reveal, setReveal] = useState(false); // toggle to show punchline

  const getJokes = async () => {
    const resp = await fetch("https://api.sampleapis.com/jokes/goodJokes");
    const json = await resp.json();
    setJokes(shuffle(json)); //shuffles jokes
  };

  useEffect(() => {
    getJokes();
  }, []); // start with one joke

  useEffect(() => {
    setReveal(false);
  }, [i]); //if joke changes (state), hide punchline

  const getNextJoke = () => {
    //increment joke index. If at end start at 0 again
    if (i < jokes.length - 1) setI(i + 1);
    else setI(0);
  };

  return (
    <View style={styles.container}>
      {!jokes ? (
        <Text style={styles.text}>Getting Jokes...</Text>
      ) : (
        <Fragment>
          <Text style={styles.jokeText}>{jokes[i].setup}</Text>
          <TouchableOpacity
            onPress={() => setReveal(!reveal)}
            style={reveal ? styles.show : styles.hidden}
          >
            {reveal ? (
              <Text style={styles.punchline}>{jokes[i].punchline}</Text>
            ) : (
              <Text style={styles.touchToReveal}>Touch for punchline</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={getNextJoke}>
            <Text style={styles.buttonText}>Tell Me Another</Text>
          </TouchableOpacity>
        </Fragment>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
