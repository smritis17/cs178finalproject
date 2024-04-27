import OpenAI from 'openai';

const useOpenAI = () => {
    const askQuestion = async (skinColor, hairColor, eyeColor, lipColor) => {
        try {
            // Initialize the OpenAI API with your API key
            const openai = new OpenAI({
                organization: 'org-x7LE1EOortseNW98HPCIMzye', 
                apiKey: 'sk-proj-8IsjShEkSngzs566PiiwT3BlbkFJOStbvs80brYxQqotgp25',
                dangerouslyAllowBrowser: true,
            });

            // Questions
            const questions = [
                `Based on my complexion with ${skinColor} skin, ${hairColor} hair, ${eyeColor} eyes, and ${lipColor} lips, which season best describes my seasonal color palette in 2 words (ex. Warm Autumn)? Why is this my seasonal color? 
                Based on my seasonal color palette, could you provide me with the top 5 clothing colors to wear that enhance my appearance? Please list them in hexadecimal format like this: '[#000000, #000000, #000000 , #000000, #000000]' . 
                Based on my seasonal color palette, what are the least flattering clothing colors (no gray) for me to wear? I'd like to avoid them. Can you list the bottom 5 colors in hexadecimal format like the following: '#000000, '[#000000, #000000 , #000000, #000000']' . 
                List the top 5 clothing colors to wear (previously in hexidecimal form) as an array of their English color names. 
                List the least flattering clothing colors (no gray) for me to wear (previously in hexidecimal form) as an array of their English color names. Omit any other details
                Separate the answer to the six questions in an array structure.`
            ];
            console.log('skin color: ', skinColor);
            console.log('hair color: ', hairColor);
            console.log('eye color: ', eyeColor);
            console.log('lip color: ', lipColor);

            // Responses
            const responses = [];

            for (const question of questions) {

                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: question}],
                    max_tokens: 500
                });
                console.log(response.choices[0].message.content.trim());

                responses.push(response.choices[0].message.content.trim());
            }

            return responses;
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error.message || error);
            return []; // Return an empty array in case of error
        }
    };

    return askQuestion;
};

export default useOpenAI;
