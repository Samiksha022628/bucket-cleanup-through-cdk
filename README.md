Step 1: Cloning the repository: git clone {link-of-repo}

Step 2: Move inside the repository: cd {repo-name}

Step 3: open VS code: code .

Step 4: Install dependencies/libraries/packages: npm install -y

Step 5: If there is a sandbox, please configure your aws credentials and bootstrap the cdk environment

aws configure

cdk bootstrap

Step 6: Create two buckets in aws console and store files in that.

Step 7: Create a github token and then pass it to the aws secret manager.

aws secretsmanager create-secret --name {secret-name} --secret-string "{github-token}" --region {aws region}

Step 8: Run the TypeScript compiler to transpile .ts files into .js: npm run build

Step 9: Staging the code: git add .

Step 10: Check the status of the file: git status

Step 11: Commit the files: git commit -m "your-message"

Step 12: Push the file into the branch of the repo: git push origin {branch-name}

Step 13: Deploy the pipeline: cdk deploy
