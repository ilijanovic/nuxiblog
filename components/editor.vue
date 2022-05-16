<template>
  <div class="w-full">
    <div class="nuxiblog__actions">
      <button
        class="p-3 hover:bg-gray-100 border"
        :class="action.selected ? 'bg-blue-100' : ''"
        v-html="action.icon"
        v-for="action in defaultActions"
        :key="action.icon"
        @click="selectAction(action)"
        :title="action.title"
      ></button>
    </div>
    <div
      class="border"
      @keydown="keyDownFormat"
      @input="inputFormat"
      contenteditable="true"
      ref="editor"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const defaultParagraphSeparator = "p";

const queryCommandState = (command: string) =>
  document.queryCommandState(command);
const exec = (command: string, value: undefined | string = undefined) =>
  document.execCommand(command, false, value);

const queryCommandValue = (command: string) =>
  document.queryCommandValue(command);

const formatBlock = "formatBlock";
let emits = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
}>();
function inputFormat({ target }: Event) {
  let firstChild = (target as HTMLElement).firstChild;
  let content = target as HTMLElement;
  if (firstChild && firstChild.nodeType === 3)
    exec(formatBlock, `<${defaultParagraphSeparator}>`);
  else if (content.innerHTML === "<br>") content.innerHTML = "";
  emits("update:modelValue", content.innerHTML);
}

function selectAction(action: ActionI) {
  action.result();
  action.selected = !action.selected;
}

function keyDownFormat(event: KeyboardEvent) {
  if (
    event.key === "Enter" &&
    queryCommandValue(formatBlock) === "blockquote"
  ) {
    setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0);
  }
}
interface ActionI {
  icon: string;
  title: string;
  result: Function;
  selected: Boolean;
}
let defaultActions = ref<ActionI[]>([
  {
    icon: "<b>B</b>",
    title: "Bold",
    result: () => exec("bold"),
    selected: false,
  },
  {
    icon: "<i>I</i>",
    title: "Italic",
    result: () => exec("italic"),
    selected: false,
  },
  {
    icon: "<u>U</u>",
    title: "Underline",
    result: () => exec("underline"),
    selected: false,
  },
  {
    icon: "<strike>S</strike>",
    title: "Strike-through",
    result: () => exec("strikeThrough"),
    selected: false,
  },
  {
    icon: "<b>H<sub>1</sub></b>",
    title: "Heading 1",
    result: () => exec(formatBlock, "<h1>"),
    selected: false,
  },
  {
    icon: "<b>H<sub>2</sub></b>",
    title: "Heading 2",
    result: () => exec(formatBlock, "<h2>"),
    selected: false,
  },
  {
    icon: "&#182;",
    title: "Paragraph",
    result: () => exec(formatBlock, "<p>"),
    selected: false,
  },
  {
    icon: "&#8220; &#8221;",
    title: "Quote",
    result: () => exec(formatBlock, "<blockquote>"),
    selected: false,
  },
  {
    icon: "&#35;",
    title: "Ordered List",
    result: () => exec("insertOrderedList"),
    selected: false,
  },
  {
    icon: "&#8226;",
    title: "Unordered List",
    result: () => exec("insertUnorderedList"),
    selected: false,
  },
  {
    icon: "&lt;/&gt;",
    title: "Code",
    result: () => exec(formatBlock, "<pre>"),
    selected: false,
  },
  {
    icon: "&#8213;",
    title: "Horizontal Line",
    result: () => exec("insertHorizontalRule"),
    selected: false,
  },
]);
</script>
