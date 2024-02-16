"use client";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import React from "react";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "How do I get started with MindReset? ",
    children: (
      <p>
        Getting started with MindReset is easy! Simply sign up for an account,
        set your goals, and begin your transformational journey towards a
        healthier digital lifestyle today.
      </p>
    ),
  },
  {
    key: "2",
    label: "Is MindReset suitable for all types of addiction?",
    children: (
      <p>
        While MindReset is primarily designed to support individuals struggling
        with addictions related to social media and pornography, our techniques
        and resources can be beneficial for individuals facing various types of
        addiction.
      </p>
    ),
  },
  {
    key: "3",
    label: "I need help. How can I contact customer support?",
    children: (
      <p>
        If you require assistance or have any questions, our customer support
        team is here to help. You can reach us via email at
        support@mindreset.com or through our online chat feature available on
        the website.
      </p>
    ),
  },
  {
    key: "4",
    label: "Is my information kept confidential?",
    children: (
      <p>
        Yes, protecting your privacy and confidentiality is our top priority.
        Rest assured that any information you provide to MindReset is kept
        strictly confidential and secure.
      </p>
    ),
  },
  {
    key: "5",
    label: "What about community support",
    children: (
      <p>
        Connect with others facing similar challenges in a safe and
        understanding community environment. Share your story, find
        encouragement, and celebrate victories together.
      </p>
    ),
  },
  {
    key: "6",
    label: "About Daily Progress Steps",
    children: (
      <p>
        Take small, manageable steps each day towards significant changes in
        your life. Our daily progress steps make your recovery journey rewarding
        and achievable.
      </p>
    ),
  },
];

const Faq: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="">
      <p className="text-4xl font-bold my-10 text-center">
        Frequently Asked Question
      </p>
      <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
    </div>
  );
};

export default Faq;
