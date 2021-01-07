import React from 'react';
import { Foo } from 'shared';
import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { api } from 'src/services/api';

interface ExamplePageProps {
  foos: Foo[];
}

export default function ExamplePage(props: ExamplePageProps) {
  const { foos } = props;
  const [count, setCount] = React.useState(foos.length);
  return (
    <div className="container p-4 mx-auto bg-green-500 text-white mt-8 text-center rounded-lg">
      Template
      <br />
      <div>foo count: {count}</div>
      <div>
        <button
          className="bg-purple-600 px-4 py-2 rounded-lg mt-4 hover:bg-purple-700 focus:outline-none active:bg-purple-800"
          onClick={() => {
            api.foo_createFoo({ name: 'foo-' + Date.now() });
            setCount(count + 1);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  return {
    props: {
      foos: await api.foo_getAllFoos(),
    },
  };
});
