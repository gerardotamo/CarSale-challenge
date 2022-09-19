import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  documents: 'src/**/!(*.d).{ts,tsx}',
  generates: {
    'src/shared/graphql/__generate__/generated.ts': {
      schema: [
        {
          'https://working-swan-45.hasura.app/v1/graphql': {
            headers: {
              'x-hasura-admin-secret':
                '6G6GeneaqR7WrQDlRdLzs7NxY0r8I480LFFT3OXGmA4Ijg8xqhIguIZkQLx5oWTl',
            },
          },
        },
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};
export default config;
