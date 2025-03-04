"use client";
import PropTypes from "prop-types";
import { Layout } from "antd";

const { Content } = Layout;

export default function EngagementsLayout({ children }) {

  return (
    <Layout>
      <Content
        className={`flex-1 overflow-auto transition-all bg-white duration-200 font-comfortaa`}>
        {children}
      </Content>
    </Layout>
  );
}

EngagementsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
