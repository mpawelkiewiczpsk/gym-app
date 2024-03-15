import React from 'react';
import { Layout, Menu, theme, Result, Button } from 'antd';

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: 'home',
        label: 'Home'
    },
    {
        key: 'prices',
        label: 'Prices'
    },
    {
        key: 'login',
        label: 'Login'
    }
]

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Result
                        status="warning"
                        title="Zastanów się zanim kupisz"
                        extra={
                            <Button type="primary" key="console">
                                Kup karnet
                            </Button>
                        }
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Gym APP
            </Footer>
        </Layout>
    );
};

export default App;
