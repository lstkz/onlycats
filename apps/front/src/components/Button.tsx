import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  link?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export const Button = React.forwardRef((props: ButtonProps, ref: any) => {
  const { children, onClick, href, link, htmlType } = props;
  const className =
    'bg-purple-600 px-3 py-1 rounded-lg hover:bg-purple-700 focus:outline-none active:bg-purple-800 text-white';

  if (href || link) {
    return (
      <a ref={ref} href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} className={className} onClick={onClick} type={htmlType}>
      {children}
    </button>
  );
});
