"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckSquare, User } from "lucide-react";

export default function Navbar() {
    const { logout, user } = useAuth();

    return (
        <nav className="glass-card" style={{
            margin: '20px',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '12px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckSquare size={32} color="var(--primary)" />
                <span style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}>TASK MANAGER SYSTEM</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid var(--border)'
                    }}>
                        <User size={18} color="var(--primary)" />
                    </div>
                    <span style={{ color: 'var(--text)', fontWeight: '500' }}>{user?.username || user?.email}</span>
                </div>
                <button onClick={logout} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
}
