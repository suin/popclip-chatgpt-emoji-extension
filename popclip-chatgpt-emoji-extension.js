// #popclip extension for ChatGPT
// name: Emoji Autocomplete by ChatGPT
// identifier: io.suin.chatgpt-emoji-autocomplete
// description: Autocomplete emoji with ChatGPT
// icon: symbol:face.smiling
// language: javascript
// module: true
// entitlements: [network]
// options:
//   - identifier: apikey
//     label: API Key
//     type: string
//     description: Obtain API key from https://platform.openai.com/account/api-keys
//   - identifier: model
//     label: Model
//     type: string
//     description: Model to use for completion. Defaults to gpt-3.5-turbo
//     default value: gpt-3.5-turbo
//   - identifier: count
//     label: Emoji Count
//     type: string
//     description: Number of emoji to autocomplete
//     default value: one
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
async function prompt(input, { apikey, model, count }) {
    const content = input.text.trim();
    const { data } = await axios_1.default.post("https://api.openai.com/v1/chat/completions", {
        model,
        messages: [
            {
                role: "system",
                content: `Perform emotion analysis and select just ${count} suitable emoji for the message without explanations, without translation.`,
            },
            { role: "user", content },
        ],
    }, { headers: { Authorization: `Bearer ${apikey}` } });
    const emoji = data.choices[0]?.message?.content.trim() ?? "";
    popclip.pasteText(content + emoji, { restore: true });
    return null;
}
exports.actions = [
    {
        title: "Autocomplete emoji with ChatGPT",
        code: prompt,
        icon: "symbol:face.smiling",
        requirements: ["text", "copy"],
    },
];
