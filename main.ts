import axios from "axios";
import type { Option } from "extension";
import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import type { Input } from "popclip";

async function prompt(input: Input, { apikey, model }: Option) {
  const content = input.text.trim();
  const messages: Array<ChatCompletionRequestMessage> = [
    {
      role: "system",
      content:
        "Perform emotion analysis and select just one suitable emoji for the message without explanations, without translation.",
    },
    { role: "user", content },
  ];
  const { data } = await axios.post<CreateChatCompletionResponse>(
    "https://api.openai.com/v1/chat/completions",
    { model, messages },
    { headers: { Authorization: `Bearer ${apikey}` } }
  );
  const emoji = data.choices[0]?.message?.content.trim() ?? "";
  return content + emoji;
}

exports.actions = [
  {
    title: "Autocomplete emoji with ChatGPT",
    after: "paste-result",
    code: prompt,
    icon: "symbol:face.smiling",
  },
];
