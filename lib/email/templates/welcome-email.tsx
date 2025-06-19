import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
} from '@react-email/components';

interface WelcomeEmailProps {
  firstName: string;
  projectName?: string;
  loginUrl?: string;
}

export function WelcomeEmail({
  firstName = 'User',
  projectName = 'tambo',
  loginUrl = 'https://tambo.co/login',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://tambo.co/logo/lockup/Tambo-Lockup.png"
              width="150"
              height="auto"
              alt="tambo"
            />
          </Section>
          
          <Section style={content}>
            <Text style={heading}>Welcome to {projectName}!</Text>
            
            <Text style={paragraph}>
              Hi {firstName},
            </Text>
            
            <Text style={paragraph}>
              Welcome to tambo! We're excited to have you on board. With tambo, you can build
              powerful AI-driven applications with ease.
            </Text>
            
            <Text style={paragraph}>
              Here are some things you can do to get started:
            </Text>
            
            <ul style={list}>
              <li>Explore the dashboard to create your first project</li>
              <li>Check out our documentation for guides and examples</li>
              <li>Join our community Discord for support and discussions</li>
            </ul>
            
            <Section style={buttonContainer}>
              <Link href={loginUrl} style={button}>
                Get Started
              </Link>
            </Section>
            
            <Text style={paragraph}>
              If you have any questions, feel free to reach out to us at{' '}
              <Link href="mailto:support@tambo.co" style={link}>
                support@tambo.co
              </Link>
            </Text>
            
            <Text style={signature}>
              Best regards,<br />
              The tambo team
            </Text>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              Fractal Dynamics Inc © 2024
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

WelcomeEmail.displayName = 'WelcomeEmail';

// Styles
const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '100%',
  maxWidth: '600px',
};

const logoContainer = {
  paddingBottom: '20px',
};

const content = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '40px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 20px',
};

const list = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  paddingLeft: '20px',
  margin: '0 0 20px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '40px 0',
};

const button = {
  backgroundColor: '#7FFFC4',
  color: '#023A41',
  padding: '12px 24px',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: '500',
  display: 'inline-block',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const signature = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '40px 0 20px',
};

const footer = {
  paddingTop: '20px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
};

const footerText = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
};