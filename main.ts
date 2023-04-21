import axios from "axios";
import type { Option } from "extension";
import type {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "openai";
import type { Action, Input, Options, PopClip } from "popclip";

declare const popclip: PopClip;

async function prompt(
  input: Input,
  { apikey, model, count }: Option & Options
) {
  const content = input.text.trim();
  const { data } = await axios.post<CreateChatCompletionResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model,
      messages: [
        {
          role: "system",
          content: `Perform emotion analysis and select just ${count} suitable emoji for the message without explanations, without translation.`,
        },
        { role: "user", content },
      ],
    } satisfies CreateChatCompletionRequest,
    { headers: { Authorization: `Bearer ${apikey}` } }
  );
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
] satisfies Array<Action>;
