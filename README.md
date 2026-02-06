# @getlatedev/social-media-api

Drop-in replacement for the [Ayrshare](https://www.ayrshare.com/) `social-media-api` SDK, powered by [Late](https://getlate.dev).

## Migration

```bash
npm uninstall social-media-api
npm install @getlatedev/social-media-api
```

Then update your import:

```diff
- import SocialMediaAPI from 'social-media-api';
+ import SocialMediaAPI from '@getlatedev/social-media-api';

const social = new SocialMediaAPI('your_late_api_key');
```

That's it. All method signatures are identical to the Ayrshare SDK.

## Get Your API Key

1. Sign up at [getlate.dev](https://getlate.dev)
2. Go to Settings > API Keys
3. Create a new API key

## Example

```typescript
import SocialMediaAPI from '@getlatedev/social-media-api';

const social = new SocialMediaAPI('your_late_api_key');

// Post to multiple platforms
const result = await social.post({
  post: "Check out Late - social media scheduling for developers!",
  platforms: ["twitter", "instagram", "linkedin"],
  mediaUrls: ["https://example.com/image.jpg"],
});

// Get post history
const history = await social.history({ lastRecords: 10 });

// Upload media
const upload = await social.upload({
  file: base64EncodedFile,
  fileName: "photo.jpg",
});
```

## Supported Methods

### Fully Implemented

All core Ayrshare SDK methods are fully supported with identical request/response formats.

| Category | Methods |
|----------|---------|
| Posts | `post`, `delete`, `getPost`, `retryPost`, `updatePost` |
| History | `history` |
| User | `user` |
| Profiles | `createProfile`, `deleteProfile`, `updateProfile`, `getProfiles` |
| Media | `upload`, `media`, `mediaUploadUrl`, `verifyMediaExists` |
| Analytics | `analyticsPost`, `analyticsSocial` |
| Comments | `postComment`, `getComments`, `deleteComments`, `replyComment` |
| Webhooks | `registerWebhook`, `unregisterWebhook`, `listWebhooks` |
| Scheduling | `setAutoSchedule`, `deleteAutoSchedule`, `listAutoSchedule` |
| Hashtags | `checkBannedHashtags` |
| Reviews | `reviews`, `review`, `replyReview`, `deleteReplyReview` |

### Not Yet Available

These methods are included in the SDK for API compatibility but return a `501` status with a descriptive message. They will be implemented as Late adds support.

| Category | Methods |
|----------|---------|
| AI Generation | `generatePost`, `generateRewrite`, `generateTranscription`, `generateTranslation`, `generateAltText` |
| RSS Feeds | `feedAdd`, `feedDelete`, `feedGet`, `feedUpdate` |
| Hashtag Tools | `autoHashtags`, `recommendHashtags` |
| URL Shortening | `shortLink`, `shortLinkAnalytics` |
| Media Tools | `resizeImage`, `mediaMeta` |
| Analytics | `analyticsLinks` |
| Profiles | `unlinkSocial`, `generateJWT` |
| Brand | `getBrandByUser` |

## Profile-Key Header

To scope requests to a specific profile, pass the `Profile-Key` header:

```typescript
social.setProfileKey('your_profile_key');

// All subsequent requests will be scoped to this profile
const history = await social.history({ lastRecords: 10 });
```

You can find your profile keys via `social.getProfiles()`.

## License

MIT
