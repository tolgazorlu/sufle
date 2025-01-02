import { useSearchStore } from "@/store/search-store";
import PromptCard from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const mockPrompts = [
  {
    title: "GPT-4 Story Writer",
    description: "Create engaging stories with complex characters",
    content: `You are an expert in TypeScript, React Native, Expo, and Mobile UI development.

  Code Style and Structure
  - Write concise, technical TypeScript code with accurate examples.
  - Use functional and declarative programming patterns; avoid classes.
  - Prefer iteration and modularization over code duplication.
  - Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
  - Structure files: exported component, subcomponents, helpers, static content, types.
  - Follow Expo's official documentation for setting up and configuring your projects: https://docs.expo.dev/

  Naming Conventions
  - Use lowercase with dashes for directories (e.g., components/auth-wizard).
  - Favor named exports for components.

  TypeScript Usage
  - Use TypeScript for all code; prefer interfaces over types.
  - Avoid enums; use maps instead.
  - Use functional components with TypeScript interfaces.
  - Use strict mode in TypeScript for better type safety.

  Syntax and Formatting
  - Use the "function" keyword for pure functions.
  - Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
  - Use declarative JSX.
  - Use Prettier for consistent code formatting.

  UI and Styling
  - Use Expo's built-in components for common UI patterns and layouts.
  - Implement responsive design with Flexbox and Expo's useWindowDimensions for screen size adjustments.
  - Use styled-components or Tailwind CSS for component styling.
  - Implement dark mode support using Expo's useColorScheme.
  - Ensure high accessibility (a11y) standards using ARIA roles and native accessibility props.
  - Leverage react-native-reanimated and react-native-gesture-handler for performant animations and gestures.

  Safe Area Management
  - Use SafeAreaProvider from react-native-safe-area-context to manage safe areas globally in your app.
  - Wrap top-level components with SafeAreaView to handle notches, status bars, and other screen insets on both iOS and Android.
  - Use SafeAreaScrollView for scrollable content to ensure it respects safe area boundaries.
  - Avoid hardcoding padding or margins for safe areas; rely on SafeAreaView and context hooks.

  Performance Optimization
  - Minimize the use of useState and useEffect; prefer context and reducers for state management.
  - Use Expo's AppLoading and SplashScreen for optimized app startup experience.
  - Optimize images: use WebP format where supported, include size data, implement lazy loading with expo-image.
  - Implement code splitting and lazy loading for non-critical components with React's Suspense and dynamic imports.
  - Profile and monitor performance using React Native's built-in tools and Expo's debugging features.
  - Avoid unnecessary re-renders by memoizing components and using useMemo and useCallback hooks appropriately.

  Navigation
  - Use react-navigation for routing and navigation; follow its best practices for stack, tab, and drawer navigators.
  - Leverage deep linking and universal links for better user engagement and navigation flow.
  - Use dynamic routes with expo-router for better navigation handling.

  State Management
  - Use React Context and useReducer for managing global state.
  - Leverage react-query for data fetching and caching; avoid excessive API calls.
  - For complex state management, consider using Zustand or Redux Toolkit.
  - Handle URL search parameters using libraries like expo-linking.

  Error Handling and Validation
  - Use Zod for runtime validation and error handling.
  - Implement proper error logging using Sentry or a similar service.
  - Prioritize error handling and edge cases:
    - Handle errors at the beginning of functions.
    - Use early returns for error conditions to avoid deeply nested if statements.
    - Avoid unnecessary else statements; use if-return pattern instead.
    - Implement global error boundaries to catch and handle unexpected errors.
  - Use expo-error-reporter for logging and reporting errors in production.

  Testing
  - Write unit tests using Jest and React Native Testing Library.
  - Implement integration tests for critical user flows using Detox.
  - Use Expo's testing tools for running tests in different environments.
  - Consider snapshot testing for components to ensure UI consistency.

  Security
  - Sanitize user inputs to prevent XSS attacks.
  - Use react-native-encrypted-storage for secure storage of sensitive data.
  - Ensure secure communication with APIs using HTTPS and proper authentication.
  - Use Expo's Security guidelines to protect your app: https://docs.expo.dev/guides/security/

  Internationalization (i18n)
  - Use react-native-i18n or expo-localization for internationalization and localization.
  - Support multiple languages and RTL layouts.
  - Ensure text scaling and font adjustments for accessibility.

  Key Conventions
  1. Rely on Expo's managed workflow for streamlined development and deployment.
  2. Prioritize Mobile Web Vitals (Load Time, Jank, and Responsiveness).
  3. Use expo-constants for managing environment variables and configuration.
  4. Use expo-permissions to handle device permissions gracefully.
  5. Implement expo-updates for over-the-air (OTA) updates.
  6. Follow Expo's best practices for app deployment and publishing: https://docs.expo.dev/distribution/introduction/
  7. Ensure compatibility with iOS and Android by testing extensively on both platforms.

  API Documentation
  - Use Expo's official documentation for setting up and configuring your projects: https://docs.expo.dev/

  Refer to Expo's documentation for detailed information on Views, Blueprints, and Extensions for best practices.
    `,
    price: 50,
    categories: ["Creative Writing", "Fiction"],
    user: {
      name: "Alice Cooper",
      avatar: "/avatars/alice.jpg",
      job: "Creative Writer",
    },
  },
  {
    title: "Technical Documentation Expert",
    description: "Generate clear and concise technical documentation",
    content: "As a technical writer with expertise in...",
    price: 35,
    categories: ["Technical Writing", "Documentation"],
    user: {
      name: "Bob Smith",
      avatar: "/avatars/bob.jpg",
      job: "Technical Writer",
    },
  },
  {
    title: "SEO Content Optimizer",
    description: "Enhance your content for better search engine rankings",
    content: "Analyze and optimize content following SEO best practices...",
    price: 45,
    categories: ["Marketing", "SEO"],
    user: {
      name: "Charlie Davis",
      avatar: "/avatars/charlie.jpg",
      job: "SEO Specialist",
    },
  },
  {
    title: "Product Description Writer",
    description: "Compelling product descriptions that convert",
    content: "Create persuasive product descriptions that highlight...",
    price: 30,
    categories: ["E-commerce", "Copywriting"],
    user: {
      name: "Eve Adams",
      avatar: "/avatars/eve.jpg",
      job: "Copywriter",
    },
  },
  {
    title: "Academic Essay Assistant",
    description: "Help with structuring and writing academic papers",
    content: "Guide students through the process of writing...",
    price: 55,
    categories: ["Academic", "Education"],
    user: {
      name: "Grace Evans",
      avatar: "/avatars/grace.jpg",
      job: "Educator",
    },
  },
  {
    title: "Social Media Manager",
    description: "Create engaging social media content and captions",
    content: "Generate creative and trending social media posts...",
    price: 40,
    categories: ["Social Media", "Marketing"],
    user: {
      name: "Hank Harris",
      avatar: "/avatars/hank.jpg",
      job: "Social Media Manager",
    },
  },
  {
    title: "Code Documentation Generator",
    description: "Generate comprehensive code documentation",
    content: "Create detailed documentation for your codebase...",
    price: 60,
    categories: ["Programming", "Documentation"],
    user: {
      name: "Ivy Johnson",
      avatar: "/avatars/ivy.jpg",
      job: "Software Developer",
    },
  },
];

export const HomePage = () => {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const filteredPrompts = mockPrompts.filter((prompt) => {
    const search = searchQuery.toLowerCase();
    return (
      prompt.title.toLowerCase().includes(search) ||
      prompt.description.toLowerCase().includes(search) ||
      prompt.categories.some((category) =>
        category.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='hidden md:block absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] -z-50'>
        <div className='hidden md:block inset-0 top-1/4 h-2/3 w-full bg-gradient-to-br from-blue-500 to-black blur-3xl opacity-20'></div>
        <div className='hidden md:block top-2/4 right-0 h-2/3 w-full bg-gradient-to-br from-purple-500 to-black blur-3xl opacity-20'></div>
      </div>
      <div className='flex flex-col gap-2 items-start py-4 px-8'>
        <span className='text-sm text-secondary-foreground/80'>
          Check out our new AI Agents
        </span>
        <div className='flex flex-col gap-1'>
          <span className='text-4xl font-bold text-secondary-foreground/80'>
            AI Prompt Marketplace
          </span>
          <span className='text-lg text-secondary-foreground/80'>
            Find AI Prompts for professional projects like AI Agents, Chatbots,
            and more
          </span>
        </div>
        <div className='flex gap-2'>
          <Button onClick={() => navigate("/create-prompt")}>
            Create Prompt
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => navigate("/create-prompt")}
          >
            Github
          </Button>
        </div>
      </div>
      <DropdownMenuSeparator className='w-full bg-secondary-foreground/10' />
      <div className='px-8 flex flex-col gap-2'>
        <div className='relative lg:w-1/2'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='w-full pl-8 rounded-lg bg-secondary-foreground/10'
            placeholder='Search prompts...'
            type='search'
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-8'>
        {filteredPrompts.map((prompt, index) => (
          <PromptCard key={index} {...prompt} />
        ))}
      </div>
    </div>
  );
};
