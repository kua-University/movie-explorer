import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useAuthPrompt() {
    const navigate = useNavigate();

    const requireAuth = () => {
        // Prevent multiple identical toasts from stacking
        toast.dismiss('auth-prompt');

        toast((t) => (
            <div className="flex flex-col gap-3 p-1">
                <p className="text-[13px] font-medium leading-relaxed text-white">
                    You can not add or access watchlist before signing in. Please sign in to get full functionality.
                </p>
                <div className="flex justify-end gap-3 mt-2">
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            toast.error("Watchlist features are disabled for guests.", { id: 'guest-toast' });
                        }}
                        className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            toast.dismiss(t.id);
                            navigate('/login');
                        }}
                        className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-primary text-black rounded-full hover:scale-105 active:scale-95 transition-all"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        ), { 
            duration: 8000,
            id: 'auth-prompt',
            style: { maxWidth: '420px', background: '#1a2232', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '16px' }
        });
    };

    return requireAuth;
}
