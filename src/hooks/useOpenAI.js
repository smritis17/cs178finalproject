import { useState } from 'react';
import OpenAI from 'openai';

//add the api key
const apiKey = 'API KEY HERE';

if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please set REACT_APP_OPENAI_API_KEY environment variable.');
}

OpenAI.apiKey = apiKey;

const useOpenAI = () => {
    const askQuestion = async (skinColor, hairColor, eyeColor) => {
        try {
            // Questions
            const questions = [
                `Given that I have ${skinColor} skin color, ${hairColor} hair color, and ${eyeColor} eye color, what seasonal color am I?`,
                "What are the top 5 colors that suit me best and give me those hex colors in a list format ex. {color 1, color 2, color 3, etc}",
                "What are the worst 5 colors that I should avoid and give me those hex colors in a list format ex. {color1, color2, color3, etc}"
            ];

            // Responses
            const responses = [];

            for (const question of questions) {
                const response = await OpenAI.Completion.create({
                    engine: 'text-davinci-003',
                    prompt: question,
                    max_tokens: 50
                });

                responses.push(response.choices[0].text.trim());
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
