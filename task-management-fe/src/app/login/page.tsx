'use client';

// pages/register.tsx
import { LockOutlined, MailOutlined, GoogleOutlined, AppleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider, Typography, message } from 'antd';
import styles from '@/styles/register.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { storeToken } from '@/services/auth';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: LoginFormValues) => {
        try{
            setLoading(true);
            
            // Fetch API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                }),
            });

            const data = await response.json();
            console.log("Login response:", data);

            if(!response.ok){
                throw new Error(data.message || "Login failed");
            }

            message.success('Registration successful! Redirecting to dashboard');
            if (data.token) {
                storeToken(data.token);
                message.success("Login successful!");
                router.push("/dashboard");
            } else {
                throw new Error("Token not found in response");
            }

        } catch (error: any){
            message.error(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Title level={2} className={styles.title}>
                Welcome back
                </Title>

                <Form
                onFinish={handleSubmit}
                layout="vertical"
                className={styles.form}
                >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                    { required: true, message: 'Please input your username!' },
                    { type: 'string', message: 'Please enter a valid username!' },
                    ]}
                >
                    <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your username"
                    size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters long!' },
                    ]}
                >
                    <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter your password"
                    size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    className={styles.continueButton}
                    loading={loading}
                    >
                    Continue
                    </Button>
                </Form.Item>
                </Form>

                <Divider plain>or</Divider>

                <div className={styles.socialButtons}>
                <Button
                    icon={<GoogleOutlined />}
                    block
                    size="large"
                    className={styles.googleButton}
                >
                    Continue with Google
                </Button>
                
                <Button
                    icon={<AppleOutlined />}
                    block
                    size="large"
                    className={styles.appleButton}
                >
                    Continue with Apple
                </Button>

                <Text type="secondary">
                    Don't have an account? {' '}
                    <a href="/register">Register here</a> 
                </Text>
                </div>
                    
                <div className={styles.footer}>
                <Text type="secondary">
                    By creating an account, you agree to our{' '}
                    <a href="/terms">Terms of Use</a> and{' '}
                    <a href="/privacy">Privacy Policy</a>
                </Text>
                </div>
            </div>
        </div>
    );
}