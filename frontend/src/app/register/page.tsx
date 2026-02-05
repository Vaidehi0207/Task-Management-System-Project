"use client";

import { useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, User, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);
        try {
            await api.post("/auth/register", { email, username, password });
            toast.success("Account created! Please login.");
            router.push("/login");
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'var(--bg)',
            padding: '20px'
        }}>
            <div className="glass-card animate-fade-in" style={{ width: '450px', padding: '48px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--primary)',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                    }}>
                        <UserPlus size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: '800', letterSpacing: '-0.5px' }}>Join Task Manager</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Start managing your tasks effectively</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', paddingLeft: '48px' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', paddingLeft: '48px' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', paddingLeft: '48px' }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', paddingLeft: '48px' }}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            marginTop: '12px',
                            height: '52px',
                            fontSize: '16px',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                        }}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Log In</Link>
                </div>
            </div>
        </div>
    );
}
