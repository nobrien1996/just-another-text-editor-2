### Are Git Credentials and GitHub Credentials the Same?

- **Git Credentials:** These are used for accessing Git repositories. They can be usernames/passwords, personal access tokens (PAT), or SSH keys.
- **GitHub Credentials:** These are specific to accessing GitHub repositories. They can be your GitHub username/password, PAT, or SSH key associated with your GitHub account.

While Git credentials are general for any Git repository, GitHub credentials are specific to GitHub.

### How to Change Your GitHub Credentials

1. **Clear Existing Credentials:**
   ```bash
   git credential-cache exit
   rm ~/.git-credentials
   git config --global --unset credential.helper
   ```

2. **Set New Credentials:**

    - **For HTTPS (Using PAT):**
      When prompted for credentials during the next Git operation (e.g., `git pull`), use your GitHub username and PAT.

    - **For SSH:**
      Generate a new SSH key if needed:
      ```bash
      ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
      ```
      Add the new SSH key to the SSH agent:
      ```bash
      eval "$(ssh-agent -s)"
      ssh-add ~/.ssh/id_rsa
      ```
      Add the new SSH key to your GitHub account by copying the key:
      ```bash
      cat ~/.ssh/id_rsa.pub
      ```

### Finding Lost Git Credentials

1. **Check Git Configurations:**
   ```bash
   git config --global credential.helper
   ```

2. **For Stored Credentials (if using `store` helper):**
   ```bash
   cat ~/.git-credentials
   ```

3. **Check Keyring (if using a credential manager):**
   Use your system’s keyring manager (e.g., `gnome-keyring` or `libsecret`) to view stored credentials.

By following these steps, you can change or recover your Git/GitHub credentials.