/**
 * @getlate/social-media-api
 *
 * Drop-in replacement for the Ayrshare `social-media-api` SDK.
 * Change your API key, swap npm packages, zero code changes.
 *
 * Usage:
 *   import SocialMediaAPI from '@getlate/social-media-api';
 *   const social = new SocialMediaAPI('your_late_api_key');
 *   await social.post({ post: "Hello!", platforms: ["twitter", "instagram"] });
 */

const BASE_URL = 'https://getlate.dev/api';

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

class SocialMediaAPI {
  private apiKey: string;
  private profileKey: string | null = null;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('API key is required');
    this.apiKey = apiKey;
  }

  /**
   * Set the active profile key for subsequent requests.
   */
  setProfileKey(profileKey: string): void {
    this.profileKey = profileKey;
  }

  // ─── Core Post Methods ───

  async post(options: {
    post?: string;
    platforms?: string[];
    mediaUrls?: string[];
    isVideo?: boolean;
    scheduleDate?: string;
    title?: string;
    visibility?: string;
    shortenLinks?: boolean;
    notes?: string;
    firstComment?: string;
    idempotencyKey?: string;
    twitterOptions?: Record<string, any>;
    instagramOptions?: Record<string, any>;
    youtubeOptions?: Record<string, any>;
    tikTokOptions?: Record<string, any>;
    linkedInOptions?: Record<string, any>;
    pinterestOptions?: Record<string, any>;
    redditOptions?: Record<string, any>;
    faceBookOptions?: Record<string, any>;
    threadsOptions?: Record<string, any>;
    gmb?: Record<string, any>;
    profileKeys?: string[];
  }) {
    return this.request('/post', { method: 'POST', body: options });
  }

  async delete(options: { id?: string; bulk?: string[] }) {
    return this.request('/post', { method: 'DELETE', body: options });
  }

  async getPost(options: { id: string }) {
    return this.request(`/post/${options.id}`);
  }

  async retryPost(options: { id: string }) {
    return this.request('/post/retry', { method: 'PUT', body: options });
  }

  async updatePost(options: { id: string; post?: string; mediaUrls?: string[]; scheduleDate?: string }) {
    return this.request('/post', { method: 'PUT', body: options });
  }

  // ─── History ───

  async history(options?: { lastRecords?: number; lastDays?: number; platform?: string; status?: string; id?: string }) {
    if (options?.id) {
      return this.request(`/history/${options.id}`);
    }
    const params = new URLSearchParams();
    if (options?.lastRecords) params.set('lastRecords', String(options.lastRecords));
    if (options?.lastDays) params.set('lastDays', String(options.lastDays));
    if (options?.platform) params.set('platform', options.platform);
    if (options?.status) params.set('status', options.status);
    const qs = params.toString();
    return this.request(`/history${qs ? `?${qs}` : ''}`);
  }

  // ─── User & Profiles ───

  async user() {
    return this.request('/user');
  }

  async createProfile(options: { title: string }) {
    return this.request('/profiles/profile', { method: 'POST', body: options });
  }

  async deleteProfile(options: { profileKey: string }) {
    return this.request('/profiles/profile', { method: 'DELETE', body: options });
  }

  async updateProfile(options: { profileKey: string; title?: string }) {
    return this.request('/profiles/profile', { method: 'PUT', body: options });
  }

  async getProfiles() {
    return this.request('/profiles');
  }

  async unlinkSocial(options: { profileKey: string; platform: string }) {
    return this.request('/profiles/social', { method: 'DELETE', body: options });
  }

  async generateJWT(options: { domain: string; privateKey: string; profileKey?: string }) {
    return this.request('/profiles/generateJWT', { method: 'POST', body: options });
  }

  // ─── Media ───

  async upload(options: { file: string; fileName?: string; description?: string }) {
    return this.request('/upload', { method: 'POST', body: options });
  }

  async media() {
    return this.request('/media');
  }

  async mediaUploadUrl(options: { fileName: string; contentType: string }) {
    const params = new URLSearchParams({ fileName: options.fileName, contentType: options.contentType });
    return this.request(`/media/uploadUrl?${params.toString()}`);
  }

  async verifyMediaExists(options: { mediaUrl: string }) {
    return this.request('/media/urlExists', { method: 'POST', body: options });
  }

  async resizeImage(options: Record<string, any>) {
    return this.request('/media/resize', { method: 'POST', body: options });
  }

  async mediaMeta() {
    return this.request('/media/meta');
  }

  // ─── Analytics ───

  async analyticsPost(options: { id: string; platforms?: string[] }) {
    return this.request('/analytics/post', { method: 'POST', body: options });
  }

  async analyticsSocial(options: { platforms: string[] }) {
    return this.request('/analytics/social', { method: 'POST', body: options });
  }

  async analyticsLinks() {
    return this.request('/analytics/links');
  }

  // ─── Comments ───

  async postComment(options: { id: string; platforms: string[]; comment: string }) {
    return this.request('/comments', { method: 'POST', body: options });
  }

  async getComments(options: { id: string }) {
    return this.request(`/comments/${options.id}`);
  }

  async deleteComments(options: { id: string; platforms?: string[] }) {
    return this.request(`/comments/${options.id}`, { method: 'DELETE', body: options });
  }

  async replyComment(options: { commentId: string; platforms: string[]; comment: string }) {
    return this.request('/comments/reply', { method: 'POST', body: options });
  }

  // ─── Webhooks ───

  async registerWebhook(options: { action: string; url: string }) {
    return this.request('/hook/webhook', { method: 'POST', body: options });
  }

  async unregisterWebhook(options: { action: string }) {
    return this.request('/hook/webhook', { method: 'DELETE', body: options });
  }

  async listWebhooks() {
    return this.request('/hook/webhook');
  }

  // ─── Auto-Schedule ───

  async setAutoSchedule(options: { schedule: Record<string, string[]>; title?: string }) {
    return this.request('/auto-schedule/set', { method: 'POST', body: options });
  }

  async deleteAutoSchedule(options: { title: string }) {
    return this.request('/auto-schedule/delete', { method: 'DELETE', body: options });
  }

  async listAutoSchedule() {
    return this.request('/auto-schedule/list');
  }

  // ─── Feed ───

  async feedAdd(options: { url: string; type?: string }) {
    return this.request('/feed', { method: 'POST', body: options });
  }

  async feedDelete(options: { id: string }) {
    return this.request('/feed', { method: 'DELETE', body: options });
  }

  async feedGet() {
    return this.request('/feed');
  }

  async feedUpdate(options: { id: string; useFirstImage?: boolean; autoHashtag?: boolean }) {
    return this.request('/feed', { method: 'PUT', body: options });
  }

  // ─── Hashtags ───

  async autoHashtags(options: { post: string; position?: string; max?: number }) {
    return this.request('/hashtags/auto', { method: 'POST', body: options });
  }

  async recommendHashtags(options: { keyword: string }) {
    const params = new URLSearchParams({ keyword: options.keyword });
    return this.request(`/hashtags/recommend?${params.toString()}`);
  }

  async checkBannedHashtags(options: { hashtag: string }) {
    const params = new URLSearchParams({ hashtag: options.hashtag });
    return this.request(`/hashtags/banned?${params.toString()}`);
  }

  // ─── Links ───

  async shortLink(options: Record<string, any>) {
    return this.request('/shorten', { method: 'POST', body: options });
  }

  async shortLinkAnalytics(options: { id: string }) {
    return this.request(`/links/${options.id}`);
  }

  // ─── Reviews ───

  async reviews(options?: { platform?: string }) {
    const params = new URLSearchParams();
    if (options?.platform) params.set('platform', options.platform);
    const qs = params.toString();
    return this.request(`/reviews${qs ? `?${qs}` : ''}`);
  }

  async review(options: { id: string; platform?: string }) {
    return this.request(`/reviews/${options.id}`);
  }

  async replyReview(options: { reviewId: string; platform: string; reply: string }) {
    return this.request('/reviews', { method: 'POST', body: options });
  }

  async deleteReplyReview(options: { reviewId: string; platform: string }) {
    return this.request('/reviews', { method: 'DELETE', body: options });
  }

  // ─── Brand ───

  async getBrandByUser(options?: Record<string, any>) {
    const params = new URLSearchParams();
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (value !== undefined) params.set(key, String(value));
      }
    }
    const qs = params.toString();
    return this.request(`/brand/byUser${qs ? `?${qs}` : ''}`);
  }

  // ─── AI Generation ───

  async generatePost(options: { text: string; hashtags?: boolean; emojis?: boolean; twitter?: boolean }) {
    return this.request('/generate/post', { method: 'POST', body: options });
  }

  async generateRewrite(options: { post: string; emojis?: boolean; hashtags?: boolean; twitter?: boolean; rewrites?: number }) {
    return this.request('/generate/rewrite', { method: 'POST', body: options });
  }

  async generateTranscription(options: { videoUrl: string }) {
    return this.request('/generate/transcription', { method: 'POST', body: options });
  }

  async generateTranslation(options: { text: string; lang: string }) {
    return this.request('/generate/translation', { method: 'POST', body: options });
  }

  async generateAltText(options: { url: string; keywords?: string; lang?: string }) {
    return this.request('/generate/altText', { method: 'POST', body: options });
  }

  // ─── Internal ───

  private async request(path: string, options: RequestOptions = {}): Promise<any> {
    const { method = 'GET', body, headers = {} } = options;

    const requestHeaders: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.profileKey) {
      requestHeaders['Profile-Key'] = this.profileKey;
    }

    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, fetchOptions);

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }

    return { status: response.ok ? 'success' : 'error', statusCode: response.status };
  }
}

export default SocialMediaAPI;
export { SocialMediaAPI };
