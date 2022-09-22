import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context";

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
