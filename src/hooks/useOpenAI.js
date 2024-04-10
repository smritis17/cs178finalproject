import OpenAI from 'openai';

const useOpenAI = () => {
    const askQuestion = async (skinColor, hairColor, eyeColor) => {
        try {
            // Initialize the OpenAI API with your API key
            // const openai = new OpenAI("key");

            const openai = new OpenAI({
                organization: 'org-x7LE1EOortseNW98HPCIMzye', 
                apiKey: process.env.REACT_APP_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
            });

            // Questions
            const questions = [
                "Given that I have ${skinColor} skin color, ${hairColor} hair color, and ${eyeColor} eye color, what season am I? Give it to me in one word.",
                "What are the top 5 colors that suit me best and give me those hex colors in a list format ex. [color 1, color 2, color 3, color4, color5]. Do not output anything else.",
                "What are the worst 5 colors that I should avoid and give me those hex colors in a list format ex. [color 1, color 2, color 3, color4, color5]. Do not output anything else."
            ];

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
