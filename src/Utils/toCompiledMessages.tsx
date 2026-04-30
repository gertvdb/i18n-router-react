import { compileMessage } from "@lingui/message-utils/compileMessage";
import type { Messages } from "@lingui/core";

export function toCompiledMessages(
  rawMessages: Record<string, string>,
): Messages {
  const compiledMessages: Messages = {};

  Object.keys(rawMessages).forEach((key) => {
    const message = rawMessages[key];
    compiledMessages[key] = compileMessage(message);
  });

  return compiledMessages;
}
