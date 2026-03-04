# 🚀 CodeCity Setup Guide (Showcase Edition)

Follow these steps to configure your Supabase project and get the city running on your local machine. This setup is streamlined for a **free showcase** experience without the need for payment gateways like Stripe.

---

## 1. Local Installation

1. **Clone your repository:**
   ```bash
   git clone https://github.com/gurbaazsingh411-hub/github-city.git
   cd github-city
   ```
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Check the environment file:**
   You should see a `.env.local` file in your root directory. You will fill this with your Supabase and GitHub credentials in the next sections.

---

## 2. Supabase Configuration (Database & Auth)

We use Supabase (PostgreSQL) as our database.

1. Go to the [Supabase Dashboard](https://supabase.com/dashboard) and create a **New Project**. Name it `CodeCity`.
2. Once your project is created, click the **Settings (gear icon)** at the bottom left, then click **API**.
3. Copy the **Project URL**, **anon `public` key**, and **service_role `secret` key**.
4. Paste them into your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
5. In your Supabase Dashboard, go to **Authentication > Providers**.
6. Enable **GitHub** and enter your GitHub OAuth App keys (see Section 3).
7. In **Authentication > URL Configuration**, ensure your Site URL is `http://localhost:3000`.

---

## 3. GitHub OAuth & API Token

1. **Create an OAuth App (For Auth)**:
   - Go to [GitHub Developer Settings > OAuth Apps](https://github.com/settings/developers).
   - Click **New OAuth App**:
     - **Application Name:** `CodeCity Local`
     - **Homepage URL:** `http://localhost:3000`
     - **Authorization callback URL:** `https://<YOUR-SUPABASE-PROJECT-ID>.supabase.co/auth/v1/callback`
   - Register it, click **Generate a new client secret**, and copy the Client ID / Secret into your Supabase Authentication Provider settings.

2. **Create a Personal Access Token (For API calls)**:
   - Go to [GitHub Developer Settings > Personal Access Tokens (Classic)](https://github.com/settings/tokens).
   - Generate a new token (classic).
   - Select the `read:user` and `repo` scopes.
   - Generate the token and paste it into `.env.local`:
     ```env
     GITHUB_TOKEN=ghp_your-token-here
     ```

---

## 4. Database Setup

To create the required tables in Supabase:
1. Go to the **SQL Editor** in your Supabase Dashboard.
2. Click **New query**.
3. (You would normally run migration scripts here. For this showcase, ensure you run the `.sql` setups located in `supabase/migrations/` if available in the repository!)

---

## 5. Running Locally

Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. You can now explore the city!
