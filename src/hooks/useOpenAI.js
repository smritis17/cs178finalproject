import OpenAI from 'openai';

const useOpenAI = () => {
    const askQuestion = async (skinColor, hairColor, eyeColor, lipColor) => {
        try {
            // Initialize the OpenAI API with your API key
            const openai = new OpenAI({
                organization: 'org-x7LE1EOortseNW98HPCIMzye', 
                apiKey: 'sk-proj-qK372Oh61ikQ7QnDdHB8T3BlbkFJmDypaQ8S7ZZTHxJCNp4O',
                dangerouslyAllowBrowser: true,
            });

            // Questions
            const questions = [
                `Based on my complexion with ${skinColor} skin, ${hairColor} hair, ${eyeColor} eyes, and ${lipColor} lips, which season best describes my seasonal color palette? Sum it up in two words. ex. Warm Autumn`,
        "Give me the top 5 colors that complement my skin, hair, eye, and lip colors? Please list them in hexadecimal format, separated by commas, like this: hex1, hex2, hex3, hex4, hex5. Exclude any additional information.",
        "Give me the worst 5 colors based on my skin, hair, eye, and lip colors? Please list them in hexadecimal format, separated by commas, like this: hex1, hex2, hex3, hex4, hex5. Exclude any additional information."
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
                    max_tokens: 50
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
