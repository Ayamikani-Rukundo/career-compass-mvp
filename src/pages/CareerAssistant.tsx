import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabaseClient";
import { Compass } from "lucide-react";

interface Message {
  id?: string;
  sender: "user" | "assistant";
  message: string;
  created_at?: string;
}

// each question has a key used to store the user's response
const ASSISTANT_QUESTIONS = [
  {
    key: "intro",
    text: "Let me know a little about you. Who are you and what does a typical day look like?",
  },
  {
    key: "challenge",
    text: "What is the biggest challenge you face when handling tasks or work?",
  },
  {
    key: "tracking",
    text: "How do you keep track of tasks and deadlines today? Does it help or hurt?",
  },
  {
    key: "burnout",
    text: "Have you noticed signs of burnout or overwhelm? What does that feel like?",
  },
  {
    key: "support",
    text: "What kind of support or structure makes working easier for you?",
  },
];

const CareerAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [responses, setResponses] = useState<Record<string, string>>({});

  useEffect(() => {
    // generate or retrieve a persistent UUID for the user
    let uid = localStorage.getItem("user_id");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("user_id", uid);
      console.log("🆕 Generated new user ID:", uid);
    } else {
      console.log("🔄 Retrieved existing user ID:", uid);
    }
    setUserId(uid);

    // try to restore conversation state from localStorage
    const savedMessages = localStorage.getItem("chat_messages");
    const savedQuestionIndex = localStorage.getItem("question_index");
    const savedResponses = localStorage.getItem("responses");
    const savedComplete = localStorage.getItem("conversation_complete");

    if (savedMessages && savedQuestionIndex !== null && savedResponses) {
      console.log("♻️ Restoring conversation from localStorage...");
      setMessages(JSON.parse(savedMessages));
      setQuestionIndex(parseInt(savedQuestionIndex));
      setResponses(JSON.parse(savedResponses));
      setConversationComplete(savedComplete === "true");
    } else {
      console.log("🆕 Starting fresh conversation...");
      // send initial greeting
      const greeting =
        "Hi 👋 I'm your AI Task Coach. I'm here to understand how you work, help you break down overwhelming tasks, and catch burnout before it happens. Let's chat so I can give you personalized support that actually fits your ADHD brain or Normal Brain. Are you ready so that we start?";
      setMessages([{ sender: "assistant", message: greeting }]);
    }
  }, []);

  // auto-save conversation state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    localStorage.setItem("question_index", questionIndex.toString());
    localStorage.setItem("responses", JSON.stringify(responses));
    localStorage.setItem(
      "conversation_complete",
      conversationComplete.toString(),
    );
    console.log("💾 Conversation state saved to localStorage");
  }, [messages, questionIndex, responses, conversationComplete]);

  // helper used only to persist the final aggregated prompt later
  const submitFinalPrompt = async (combined: string) => {
    try {
      console.log("📤 Submitting final prompt to Supabase...");
      console.log("👤 User ID:", userId);
      console.log("📝 Combined Prompt:", combined);

      const { data, error } = await supabase
        .from("messages")
        .insert([{ user_id: userId, prompt: combined, status: "pending" }]);

      if (error) {
        console.error("❌ Error submitting final prompt:", error);
        console.error("Error details:", {
          code: error.code,
          message: error.message,
        });
      } else {
        console.log("✅ Successfully submitted to Supabase!");
        console.log("📊 Response data:", data);
      }
    } catch (err) {
      console.error("🚨 Exception while submitting final prompt:", err);
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    const currentQuestion = ASSISTANT_QUESTIONS[questionIndex];
    const key = currentQuestion ? currentQuestion.key : `q${questionIndex}`;

    // store the response locally
    const updated = { ...responses, [key]: userMessage };
    setResponses(updated);

    console.log(`📌 Stored response for '${key}':`, userMessage);
    console.log(`📋 Current collected responses:`, updated);

    const newUserMessage: Message = { sender: "user", message: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let assistantResponse = "";

    if (questionIndex < ASSISTANT_QUESTIONS.length - 1) {
      // ask the next question
      assistantResponse = ASSISTANT_QUESTIONS[questionIndex + 1].text;
    } else {
      // final step - combine all responses and send once
      const combined = Object.entries(updated)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      await submitFinalPrompt(combined);

      assistantResponse =
        "Thank you so much for sharing all of this with me! 🎉\n\nI now have a good understanding of how you work, what challenges you face, and what kind of support helps you most. We'll craft a personalized task plan and send it to your email soon.";
      setConversationComplete(true);
    }

    const newAssistantMessage: Message = {
      sender: "assistant",
      message: assistantResponse,
    };
    setMessages((prev) => [...prev, newAssistantMessage]);
    setQuestionIndex((prev) => prev + 1);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-4xl py-3 flex items-center justify-between px-4">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-primary rounded-lg p-1.5 group-hover:rotate-12 transition-transform">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
              PathFinder
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-medium text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded">
              Task Coach
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col w-full relative">
        <ChatWindow messages={messages} />

        <div className="max-w-2xl mx-auto w-full">
          {conversationComplete && (
            <div className="mx-4 mb-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-sm text-primary font-semibold mb-4">
                Your information has been received successfully! We'll analyze
                your work patterns and burnout risks to create a personalized
                task management plan. Check your email for detailed guidance
                tailored to your ADHD brain or Normal Brain.
              </p>
              <button
                onClick={() => {
                  // clear conversation state for fresh start on next visit
                  localStorage.removeItem("chat_messages");
                  localStorage.removeItem("question_index");
                  localStorage.removeItem("responses");
                  localStorage.removeItem("conversation_complete");
                  console.log(
                    "🗑️ Cleared conversation state from localStorage",
                  );
                  navigate("/");
                }}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                data-testid="button-back-home"
              >
                Back to Home
              </button>
            </div>
          )}

          {!conversationComplete && (
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAssistant;
