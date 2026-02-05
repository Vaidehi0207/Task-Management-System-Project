"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Plus, Search, Trash2, CheckCircle, Circle, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export default function DashboardPage() {
    const { token, loading: authLoading } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(""); // "", "completed", "pending"
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        if (!authLoading && !token) {
            router.push("/login");
        }
    }, [authLoading, token, router]);


    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/tasks", {
                params: { search, status: status === "pending" ? "false" : status, page, limit: 6 }
            });
            setTasks(data.tasks);
            setTotalPages(data.pages);
        } catch {
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }, [search, status, page]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchTasks();
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [fetchTasks]);

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await api.patch(`/tasks/${editingTask.id}`, formData);
                toast.success("Task updated");
            } else {
                await api.post("/tasks", formData);
                toast.success("Task created");
            }
            setIsModalOpen(false);
            setEditingTask(null);
            setFormData({ title: "", description: "" });
            fetchTasks();
        } catch {
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this task?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            toast.success("Task deleted");
            fetchTasks();
        } catch {
            toast.error("Failed to delete task");
        }
    };

    const handleToggle = async (id: number) => {
        try {
            await api.patch(`/tasks/${id}/toggle`);
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        } catch {
            toast.error("Failed to update status");
        }
    };

    const openEdit = (task: Task) => {
        setEditingTask(task);
        setFormData({ title: task.title, description: task.description || "" });
        setIsModalOpen(true);
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Navbar />

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
                    <h2 style={{ fontSize: '24px' }}>My Tasks</h2>
                    <button className="btn-primary" onClick={() => { setEditingTask(null); setFormData({ title: "", description: "" }); setIsModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} />
                        New Task
                    </button>
                </div>

                {/* Filters */}
                <div className="glass-card" style={{ padding: '20px', marginBottom: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', paddingLeft: '40px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'white',
                                border: '1px solid var(--border)',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                outline: 'none'
                            }}
                        >
                            <option value="" style={{ color: 'black' }}>All Status</option>
                            <option value="completed" style={{ color: 'black' }}>Completed</option>
                            <option value="pending" style={{ color: 'black' }}>Pending</option>
                        </select>
                    </div>
                </div>

                {/* Tasks List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {loading && tasks.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1', color: 'var(--text-muted)' }}>Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: 'var(--text-muted)' }}>No tasks found.</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className="glass-card animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <button onClick={() => handleToggle(task.id)} style={{ background: 'none' }}>
                                        {task.completed ? <CheckCircle color="var(--success)" size={24} /> : <Circle color="var(--text-muted)" size={24} />}
                                    </button>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => openEdit(task)} className="btn-ghost" style={{ padding: '4px' }}><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(task.id)} className="btn-ghost" style={{ padding: '4px', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '18px', marginBottom: '8px', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'white' }}>{task.title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>{task.description}</p>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{new Date(task.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-ghost"><ChevronLeft /></button>
                        <span>Page {page} of {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn-ghost"><ChevronRight /></button>
                    </div>
                )}
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '20px' }}>
                    <div className="glass-card animate-fade-in" style={{ width: '500px', padding: '32px' }}>
                        <h2 style={{ marginBottom: '24px' }}>{editingTask ? "Edit Task" : "Create New Task"}</h2>
                        <form onSubmit={handleCreateOrUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Title</label>
                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: 'white',
                                        border: '1px solid var(--border)',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost">Cancel</button>
                                <button type="submit" className="btn-primary">{editingTask ? "Update" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
