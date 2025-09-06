import {
  ChatPromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

export const aiCall = async (
  cuisine = "any",
  dish_type = "dish",
  people = 2
) => {
  const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
  });

  // ---------- SYSTEM PROMPT ----------
  const systemMsg = new PromptTemplate({
    template: `You are an expert international chef.
Always return the recipe in valid JSON with the following structure:

{{
  "short_intro": "string — must be between 20 and 30 words, concise, descriptive, and natural",
  "vegetarian": "true|false based on dish is veg or non-veg",
  "category": "string",
  "servings": number,
  "difficulty": "Easy | Medium | Hard",
  "time": "string",
  "calories": "string",
  "steps": ["step 1", "step 2", "..."],
  "ingredients": [
    {{"name": "string", "quantity": "string"}}
  ]
}}

Rules:
- "short_intro" must strictly be between 20 and 30 words.
- Do not add text outside the JSON.
- Do not repeat the recipe title in short_intro.`,
    inputVariables: [],
  });

  // ---------- HUMAN PROMPT ----------
  const humanMsg = new PromptTemplate({
    template: `Create a unique {cuisine} {dish_type} recipe for {people} people.

Include:
- Creative title
- Category
- Number of servings
- Difficulty
- Time
- Calories
- Step-by-step instructions
- Exact ingredients with quantities`,
    inputVariables: ["cuisine", "dish_type", "people"],
  });

  // ---------- PROMPT PIPELINE ----------
  const systemMsgPrompt = new SystemMessagePromptTemplate({
    prompt: systemMsg,
  });
  const humanMsgPrompt = new HumanMessagePromptTemplate({ prompt: humanMsg });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    systemMsgPrompt,
    humanMsgPrompt,
  ]);

  // ---------- EXECUTION ----------
  const formattedChatPrompt = await chatPrompt.formatMessages({
    cuisine,
    dish_type,
    people,
  });
  const response = await llm.invoke(formattedChatPrompt);

  // ---------- PARSE JSON ----------
  try {
    const recipe = JSON.parse(response.content);

    // --- Post-process veg/non-veg correctness ---
    const nonVegItems = [
      "chicken",
      "beef",
      "pork",
      "fish",
      "shrimp",
      "egg",
      "mutton",
      "lamb",
      "turkey",
      "duck",
    ];
    const ingredientNames = recipe.ingredients.map((i) => i.name.toLowerCase());

    if (
      ingredientNames.some((name) =>
        nonVegItems.some((item) => name.includes(item))
      )
    ) {
      recipe.veg = "non-veg";
    } else {
      recipe.veg = "veg";
    }

    // --- Post-process short_intro length (20–30 words) ---
    let words = recipe.short_intro.split(/\s+/);
    if (words.length > 30) {
      recipe.short_intro = words.slice(0, 30).join(" ") + ".";
    } else if (words.length < 20) {
      recipe.short_intro +=
        " A flavorful and wholesome dish crafted to delight and satisfy everyone at the table.";
    }

    return recipe;
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err.message);
    console.log("Raw Output:", response.content);
    return null;
  }
};
