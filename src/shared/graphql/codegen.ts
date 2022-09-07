import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: 'src/**/!(*.d).{ts,tsx}',
  generates: {
    'src/shared/graphql/__generate__/generated.ts': {
      schema: [
        {
          'https://new-anchovy-87.hasura.app/v1/graphql': {
            headers: {
              "x-hasura-admin-secret": "rTisquXVdS2Ffxe5nK92OnNQjK72OpuKTPWUpM4kbr33bUF5zVHj63tET1N8jhez"
            }
          }
        }
      ],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    },
  },
};
export default config;

