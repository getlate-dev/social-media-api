/**
 * @getlatedev/social-media-api
 *
 * Drop-in replacement for the Ayrshare `social-media-api` SDK.
 * Change your API key, swap npm packages, zero code changes.
 *
 * Usage:
 *   import SocialMediaAPI from '@getlatedev/social-media-api';
 *   const social = new SocialMediaAPI('your_late_api_key');
 *   await social.post({ post: "Hello!", platforms: ["twitter", "instagram"] });
 */

const BASE_URL = 'https://getlate.dev/api';

// ─── Exported Types ───

export interface CreatePostOptions {
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
}

export interface DeletePostOptions {
  id?: string;
  bulk?: string[];
}

export interface GetPostOptions {
  id: string;
}

export interface RetryPostOptions {
  id: string;
}

export interface UpdatePostOptions {
  id: string;
  post?: string;
  mediaUrls?: string[];
  scheduleDate?: string;
}

export interface HistoryOptions {
  lastRecords?: number;
  lastDays?: number;
  platform?: string;
  status?: string;
  id?: string;
}

export interface CreateProfileOptions {
  title: string;
}

export interface DeleteProfileOptions {
  profileKey: string;
}

export interface UpdateProfileOptions {
  profileKey: string;
  title?: string;
}

export interface UnlinkSocialOptions {
  profileKey: string;
  platform: string;
}

export interface GenerateJWTOptions {
  domain: string;
  privateKey: string;
  profileKey?: string;
}

export interface UploadOptions {
  file: string;
  fileName?: string;
  description?: string;
}

export interface MediaUploadUrlOptions {
  fileName: string;
  contentType: string;
}

export interface VerifyMediaExistsOptions {
  mediaUrl: string;
}

export interface AnalyticsPostOptions {
  id: string;
  platforms?: string[];
}

export interface AnalyticsSocialOptions {
  platforms: string[];
}

export interface PostCommentOptions {
  id: string;
  platforms: string[];
  comment: string;
}

export interface GetCommentsOptions {
  id: string;
}

export interface DeleteCommentsOptions {
  id: string;
  platforms?: string[];
}

export interface ReplyCommentOptions {
  commentId: string;
  platforms: string[];
  comment: string;
}

export interface RegisterWebhookOptions {
  action: string;
  url: string;
}

export interface UnregisterWebhookOptions {
  action: string;
}

export interface SetAutoScheduleOptions {
  schedule: Record<string, string[]>;
  title?: string;
}

export interface DeleteAutoScheduleOptions {
  title: string;
}

export interface FeedAddOptions {
  url: string;
  type?: string;
}

export interface FeedDeleteOptions {
  id: string;
}

export interface FeedUpdateOptions {
  id: string;
  useFirstImage?: boolean;
  autoHashtag?: boolean;
}

export interface AutoHashtagsOptions {
  post: string;
  position?: string;
  max?: number;
}

export interface RecommendHashtagsOptions {
  keyword: string;
}

export interface CheckBannedHashtagsOptions {
  hashtag: string;
}

export interface ReviewsOptions {
  platform?: string;
}

export interface ReviewOptions {
  id: string;
  platform?: string;
}

export interface ReplyReviewOptions {
  reviewId: string;
  platform: string;
  reply: string;
}

export interface DeleteReplyReviewOptions {
  reviewId: string;
  platform: string;
}

export interface GeneratePostOptions {
  text: string;
  hashtags?: boolean;
  emojis?: boolean;
  twitter?: boolean;
}

export interface GenerateRewriteOptions {
  post: string;
  emojis?: boolean;
  hashtags?: boolean;
  twitter?: boolean;
  rewrites?: number;
}

export interface GenerateTranscriptionOptions {
  videoUrl: string;
}

export interface GenerateTranslationOptions {
  text: string;
  lang: string;
}

export interface GenerateAltTextOptions {
  url: string;
  keywords?: string;
  lang?: string;
}

export interface PostResponse {
  status: string;
  id?: string;
  refId?: string;
  postIds?: Array<{
    status: string;
    id: string | null;
    postUrl: string | null;
    platform: string;
  }>;
  scheduleDate?: string;
  post?: string;
  mediaUrls?: string[];
  [key: string]: any;
}

export interface HistoryItem {
  id: string;
  post: string;
  platforms: string[];
  mediaUrls: string[];
  status: string;
  created: string;
  scheduleDate?: string;
  postIds: Array<{
    status: string;
    id: string | null;
    postUrl: string | null;
    platform: string;
  }>;
  [key: string]: any;
}

export interface UserResponse {
  status: string;
  email: string;
  displayNames: Record<string, string>;
  activeSocialAccounts: string[];
  created: string;
  [key: string]: any;
}

export interface ProfileResponse {
  status: string;
  profileKey: string;
  title: string;
  created: string;
  [key: string]: any;
}

export interface ErrorResponse {
  status: 'error';
  code: number;
  message: string;
  [key: string]: any;
}

// ─── Internal ───

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

  async post(options: CreatePostOptions): Promise<PostResponse> {
    return this.request('/post', { method: 'POST', body: options });
  }

  async delete(options: DeletePostOptions): Promise<PostResponse> {
    return this.request('/post', { method: 'DELETE', body: options });
  }

  async getPost(options: GetPostOptions): Promise<HistoryItem> {
    return this.request(`/post/${options.id}`);
  }

  async retryPost(options: RetryPostOptions): Promise<PostResponse> {
    return this.request('/post/retry', { method: 'PUT', body: options });
  }

  async updatePost(options: UpdatePostOptions): Promise<PostResponse> {
    return this.request('/post', { method: 'PUT', body: options });
  }

  // ─── History ───

  async history(options?: HistoryOptions): Promise<HistoryItem[] | HistoryItem> {
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

  async user(): Promise<UserResponse> {
    return this.request('/user');
  }

  async createProfile(options: CreateProfileOptions): Promise<ProfileResponse> {
    return this.request('/profiles/profile', { method: 'POST', body: options });
  }

  async deleteProfile(options: DeleteProfileOptions): Promise<{ status: string }> {
    return this.request('/profiles/profile', { method: 'DELETE', body: options });
  }

  async updateProfile(options: UpdateProfileOptions): Promise<ProfileResponse> {
    return this.request('/profiles/profile', { method: 'PUT', body: options });
  }

  async getProfiles(): Promise<{ status: string; profiles: ProfileResponse[] }> {
    return this.request('/profiles');
  }

  async unlinkSocial(options: UnlinkSocialOptions): Promise<{ status: string }> {
    return this.request('/profiles/social', { method: 'DELETE', body: options });
  }

  async generateJWT(options: GenerateJWTOptions): Promise<{ status: string }> {
    return this.request('/profiles/generateJWT', { method: 'POST', body: options });
  }

  // ─── Media ───

  async upload(options: UploadOptions): Promise<{ status: string; url?: string; [key: string]: any }> {
    return this.request('/upload', { method: 'POST', body: options });
  }

  async media(): Promise<{ status: string; media: any[] }> {
    return this.request('/media');
  }

  async mediaUploadUrl(options: MediaUploadUrlOptions): Promise<{ status: string; uploadUrl: string; accessUrl: string; contentType: string }> {
    const params = new URLSearchParams({ fileName: options.fileName, contentType: options.contentType });
    return this.request(`/media/uploadUrl?${params.toString()}`);
  }

  async verifyMediaExists(options: VerifyMediaExistsOptions): Promise<{ status: string; exists: boolean; contentType?: string }> {
    return this.request('/media/urlExists', { method: 'POST', body: options });
  }

  async resizeImage(options: Record<string, any>): Promise<{ status: string }> {
    return this.request('/media/resize', { method: 'POST', body: options });
  }

  async mediaMeta(): Promise<{ status: string }> {
    return this.request('/media/meta');
  }

  // ─── Analytics ───

  async analyticsPost(options: AnalyticsPostOptions): Promise<{ status: string; id: string; analytics: Record<string, any> }> {
    return this.request('/analytics/post', { method: 'POST', body: options });
  }

  async analyticsSocial(options: AnalyticsSocialOptions): Promise<{ status: string; analytics: Record<string, any> }> {
    return this.request('/analytics/social', { method: 'POST', body: options });
  }

  async analyticsLinks(): Promise<{ status: string }> {
    return this.request('/analytics/links');
  }

  // ─── Comments ───

  async postComment(options: PostCommentOptions): Promise<{ status: string }> {
    return this.request('/comments', { method: 'POST', body: options });
  }

  async getComments(options: GetCommentsOptions): Promise<{ status: string; comments: any[] }> {
    return this.request(`/comments/${options.id}`);
  }

  async deleteComments(options: DeleteCommentsOptions): Promise<{ status: string }> {
    return this.request(`/comments/${options.id}`, { method: 'DELETE', body: options });
  }

  async replyComment(options: ReplyCommentOptions): Promise<{ status: string }> {
    return this.request('/comments/reply', { method: 'POST', body: options });
  }

  // ─── Webhooks ───

  async registerWebhook(options: RegisterWebhookOptions): Promise<{ status: string }> {
    return this.request('/hook/webhook', { method: 'POST', body: options });
  }

  async unregisterWebhook(options: UnregisterWebhookOptions): Promise<{ status: string }> {
    return this.request('/hook/webhook', { method: 'DELETE', body: options });
  }

  async listWebhooks(): Promise<{ status: string; webhooks: any[] }> {
    return this.request('/hook/webhook');
  }

  // ─── Auto-Schedule ───

  async setAutoSchedule(options: SetAutoScheduleOptions): Promise<{ status: string }> {
    return this.request('/auto-schedule/set', { method: 'POST', body: options });
  }

  async deleteAutoSchedule(options: DeleteAutoScheduleOptions): Promise<{ status: string }> {
    return this.request('/auto-schedule/delete', { method: 'DELETE', body: options });
  }

  async listAutoSchedule(): Promise<{ status: string; schedules: any[] }> {
    return this.request('/auto-schedule/list');
  }

  // ─── Feed ───

  async feedAdd(options: FeedAddOptions): Promise<{ status: string }> {
    return this.request('/feed', { method: 'POST', body: options });
  }

  async feedDelete(options: FeedDeleteOptions): Promise<{ status: string }> {
    return this.request('/feed', { method: 'DELETE', body: options });
  }

  async feedGet(): Promise<{ status: string }> {
    return this.request('/feed');
  }

  async feedUpdate(options: FeedUpdateOptions): Promise<{ status: string }> {
    return this.request('/feed', { method: 'PUT', body: options });
  }

  // ─── Hashtags ───

  async autoHashtags(options: AutoHashtagsOptions): Promise<{ status: string }> {
    return this.request('/hashtags/auto', { method: 'POST', body: options });
  }

  async recommendHashtags(options: RecommendHashtagsOptions): Promise<{ status: string }> {
    const params = new URLSearchParams({ keyword: options.keyword });
    return this.request(`/hashtags/recommend?${params.toString()}`);
  }

  async checkBannedHashtags(options: CheckBannedHashtagsOptions): Promise<{ status: string; hashtag: string; isBanned: boolean }> {
    const params = new URLSearchParams({ hashtag: options.hashtag });
    return this.request(`/hashtags/banned?${params.toString()}`);
  }

  // ─── Links ───

  async shortLink(options: Record<string, any>): Promise<{ status: string }> {
    return this.request('/shorten', { method: 'POST', body: options });
  }

  /** Alias for shortLink */
  async shorten(options: Record<string, any>): Promise<{ status: string }> {
    return this.shortLink(options);
  }

  async shortLinkAnalytics(options: { id: string }): Promise<{ status: string }> {
    return this.request(`/links/${options.id}`);
  }

  // ─── Reviews ───

  async reviews(options?: ReviewsOptions): Promise<{ status: string; reviews: any[] }> {
    const params = new URLSearchParams();
    if (options?.platform) params.set('platform', options.platform);
    const qs = params.toString();
    return this.request(`/reviews${qs ? `?${qs}` : ''}`);
  }

  async review(options: ReviewOptions): Promise<{ status: string }> {
    return this.request(`/reviews/${options.id}`);
  }

  async replyReview(options: ReplyReviewOptions): Promise<{ status: string }> {
    return this.request('/reviews', { method: 'POST', body: options });
  }

  async deleteReplyReview(options: DeleteReplyReviewOptions): Promise<{ status: string }> {
    return this.request('/reviews', { method: 'DELETE', body: options });
  }

  // ─── Brand ───

  async getBrandByUser(options?: Record<string, any>): Promise<{ status: string }> {
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

  async generatePost(options: GeneratePostOptions): Promise<{ status: string }> {
    return this.request('/generate/post', { method: 'POST', body: options });
  }

  async generateRewrite(options: GenerateRewriteOptions): Promise<{ status: string }> {
    return this.request('/generate/rewrite', { method: 'POST', body: options });
  }

  async generateTranscription(options: GenerateTranscriptionOptions): Promise<{ status: string }> {
    return this.request('/generate/transcription', { method: 'POST', body: options });
  }

  async generateTranslation(options: GenerateTranslationOptions): Promise<{ status: string }> {
    return this.request('/generate/translation', { method: 'POST', body: options });
  }

  async generateAltText(options: GenerateAltTextOptions): Promise<{ status: string }> {
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
