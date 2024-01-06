import React, { useEffect, useState } from 'react';

interface Character {
  _id: string;
  name: string;
}

interface Quote {
  dialog: string;
  character: string;
}

const App: React.FC = () => {
  const [quote, setQuote] = useState<string | undefined>();
  const [character, setCharacter] = useState<string | undefined>();

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer yourapikey',
    };

    const fetchData = async () => {
      try {
        const rawQuotes = await fetch('https://the-one-api.dev/v2/quote', {
          headers: headers,
        });

        const quotes = await rawQuotes.json();
        const quoteData: Quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];

        setQuote(quoteData.dialog);

        const rawCharacters = await fetch(`http://the-one-api.dev/v2/character?_id=${quoteData.character}`, {
          headers: headers,
        });

        const characters = await rawCharacters.json();
        const characterData: Character = characters.docs[0];

        setCharacter(characterData.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <blockquote>{quote}</blockquote>
      <cite>- {character}</cite>
    </div>
  );
};

export default App;
