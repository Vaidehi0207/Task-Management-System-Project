# Use Node.js LTS version
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Pass build-time environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-slim

WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
