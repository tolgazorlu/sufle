import { Layout } from './components/Layout';
import { UserProfile } from './components/UserProfile';
import { useAuthStore } from './store/auth.store';

function App() {
  const { isConnected } = useAuthStore();

  return (
    <Layout>
      {isConnected && (
        <div className="max-w-2xl mx-auto">
          <UserProfile />
        </div>
      )}
    </Layout>
  );
}

export default App;
