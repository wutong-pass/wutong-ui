/* eslint-disable react/react-in-jsx-scope */
import { Icon } from 'antd';
import wutongUtil from './wutong';

const oauthUtil = {
  getEnableGitOauthServer(enterprise) {
    const servers = [];
    if (wutongUtil.OauthEnterpriseEnable(enterprise)) {
      enterprise.oauth_services.value.map(item => {
        if (item.is_git && item.enable) {
          servers.push(item);
        }
      });
    }
    return servers;
  },
  getAuthredictURL(item) {
    if (item) {
      const {
        oauth_type: oauthType,
        client_id: clientId,
        auth_url: authUrl,
        redirect_uri: redirectUri,
        service_id: serviceId,
        authorize_url: authorizeUrl
      } = item;
      if (oauthType === 'enterprisecenter' && authorizeUrl) {
        const str = authorizeUrl;
        const agreement = `${window.location.protocol}//`;
        const content = window.location.host;
        const suffix = str.substring(
          str.indexOf('/enterprise-server'),
          str.length
        );
        const newUrl = agreement + content + suffix;
        const isRedirectUrl = newUrl.indexOf('redirect_uri=') > -1;
        const redirectbefore =
          isRedirectUrl && newUrl.substring(0, newUrl.indexOf('redirect_uri='));

        const redirectSuffix =
          isRedirectUrl &&
          newUrl.substring(newUrl.indexOf('/console'), newUrl.length);
        const url = isRedirectUrl
          ? `${`${redirectbefore}redirect_uri=${agreement}${content}`}${redirectSuffix}`
          : newUrl;
        return url;
      }

      if (authorizeUrl) {
        return authorizeUrl;
      }
      if (oauthType == 'github') {
        return `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}?service_id=${serviceId}&scope=user%20repo%20admin:repo_hook`;
      }
      return `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}?service_id=${serviceId}&response_type=code`;
    }
    return null;
  },
  getIcon(item, size = '32px') {
    const GithubSvg = () => (
      <svg
        t="1606294886023"
        viewBox="0 0 1024 1024"
        p-id="4159"
        width={size}
        height={size}
      >
        <path
          d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z"
          fill="#0085a1"
          p-id="4160"
        />
      </svg>
    );
    const GitlabSvg = () => (
      <svg viewBox="0 0 1024 1024" width={size} height={size}>
        <path
          d="M513.6 982.08l187.84-578.24H325.76l187.84 578.24z"
          fill="#E24329"
          p-id="4662"
        />
        <path
          d="M513.6 982.08l-187.84-578.24H62.4l451.2 578.24z"
          fill="#FC6D26"
          p-id="4663"
        />
        <path
          d="M62.4 403.84L5.44 579.52c-5.12 16 0.64 33.6 14.08 43.52l494.4 359.04L62.4 403.84z"
          fill="#FCA326"
          p-id="4664"
        />
        <path
          d="M62.4 403.84h263.36L212.48 55.36c-5.76-17.92-31.04-17.92-37.12 0L62.4 403.84z"
          fill="#E24329"
          p-id="4665"
        />
        <path
          d="M513.6 982.08l187.84-578.24h263.36l-451.2 578.24z"
          fill="#FC6D26"
          p-id="4666"
        />
        <path
          d="M965.12 403.84l56.96 175.68c5.12 16-0.64 33.6-14.08 43.52L513.6 982.08l451.52-578.24z"
          fill="#FCA326"
          p-id="4667"
        />
        <path
          d="M965.12 403.84h-263.36l113.28-348.48c5.76-17.92 31.04-17.92 37.12 0l112.96 348.48z"
          fill="#E24329"
          p-id="4668"
        />
      </svg>
    );
    const GiteeSvg = () => (
      <svg
        t="1606294090826"
        viewBox="0 0 1024 1024"
        p-id="1905"
        width={size}
        height={size}
      >
        <path
          d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
          fill="#C71D23"
          p-id="1906"
        />
        <path
          d="M771.168 455.136h-290.784a25.28 25.28 0 0 0-25.28 25.28v63.2c0 13.952 11.296 25.28 25.28 25.28h176.992a25.28 25.28 0 0 1 25.28 25.28v12.64a75.84 75.84 0 0 1-75.84 75.84h-240.224a25.28 25.28 0 0 1-25.28-25.28v-240.192a75.84 75.84 0 0 1 75.84-75.84h353.92c13.984 0 25.28-11.328 25.312-25.28l0.032-63.2a25.28 25.28 0 0 0-25.28-25.28H417.216a189.632 189.632 0 0 0-189.632 189.6V771.2c0 13.952 11.328 25.28 25.28 25.28h372.96a170.656 170.656 0 0 0 170.656-170.656v-145.376a25.28 25.28 0 0 0-25.28-25.28z"
          fill="#FFFFFF"
          p-id="1907"
        />
      </svg>
    );
    const NailingSvg = () => (
      <svg
        t="1606294496035"
        viewBox="0 0 1024 1024"
        p-id="2710"
        width={size}
        height={size}
      >
        <path
          d="M241.664 195.584c-2.56 0-4.608 0.512-6.144 2.048-2.56 2.048-3.584 4.096-3.584 5.632-7.68 43.52 11.776 110.08 49.664 141.824 18.432 15.36 259.072 94.208 259.072 94.208S286.208 385.024 281.088 384.512h-1.536c-3.072 0-5.12 1.024-7.168 3.072-1.536 1.536-3.072 5.12-2.56 8.192 9.216 48.64 58.368 103.424 100.864 111.616 34.816 6.656 173.056 9.728 173.056 9.728s-168.96 22.528-173.056 23.552c-3.584 0.512-6.144 3.072-7.168 5.12-1.024 2.048-2.048 5.12 0 8.704 7.168 14.336 29.696 36.352 29.696 36.352 33.28 32.256 69.12 38.4 90.624 38.4 8.192 0 13.824-1.024 17.408-1.536 12.288-2.048 45.056-12.288 59.904-18.944l-28.16 95.744 83.456 0.512-49.664 152.576 181.248-218.624h-88.576s83.456-130.56 109.056-178.176c7.68-12.288 10.752-30.72 5.632-44.544-5.12-13.824-16.384-24.576-37.376-32.768-19.456-7.168-161.28-56.32-217.6-76.288-116.736-40.96-251.904-101.888-272.384-110.592-2.048-0.512-3.584-1.024-5.12-1.024zM512 0c282.624 0 512 229.376 512 512s-229.376 512-512 512S0 794.624 0 512 229.376 0 512 0z"
          fill="#3296FA"
          p-id="2711"
        />
      </svg>
    );
    const OauthSvg = () => (
      <svg
        t="1606286889022"
        viewBox="0 0 1024 1024"
        p-id="1951"
        width={size}
        height={size}
      >
        <path
          d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0c282.760533 0 512 229.239467 512 512 0 282.760533-229.239467 512-512 512z m0-68.266667c245.077333 0 443.733333-198.656 443.733333-443.733333S757.077333 68.266667 512 68.266667 68.266667 266.922667 68.266667 512s198.656 443.733333 443.733333 443.733333z"
          fill="#357CE1"
          p-id="1952"
        />
        <path
          d="M500.224 644.3008l-54.9888 55.227733a85.367467 85.367467 0 0 1-120.763733-120.763733l103.492266-103.492267-30.276266-30.071466-103.287467 103.492266a128 128 0 0 0-1.262933 182.1696A128 128 0 0 0 384 768a129.501867 129.501867 0 0 0 92.16-38.4l54.3744-55.022933-30.3104-30.276267zM499.4048 403.831467l79.36-79.36a85.367467 85.367467 0 1 1 120.763733 120.763733l-127.658666 127.624533 30.3104 30.071467 127.419733-127.624533a128 128 0 0 0 1.297067-182.1696A128 128 0 0 0 640 256a129.501867 129.501867 0 0 0-92.16 38.4l-78.506667 79.1552 30.071467 30.276267z"
          fill="#357CE1"
          p-id="1953"
        />
      </svg>
    );
    const AliyunSvg = () => (
      <svg
        t="1606461675119"
        viewBox="0 0 1639 1024"
        p-id="6641"
        width={size}
        height={size}
      >
        <path
          d="M545.497212 568.816485h545.078303V445.915798H545.497212z"
          fill="#FE6A00"
          p-id="6642"
        />
        <path
          d="M1363.642182-0.005172H1002.987313L1090.011798 123.185131l262.930101 80.539152A113.700202 113.700202 0 0 1 1432.358788 312.883717l0.025858 0.284445v394.084848a113.705374 113.705374 0 0 1-79.437575 109.164606l-262.930101 80.559839L1002.987313 1020.167758h360.654869c150.445253 0 272.409859-121.980121 272.409858-272.430546v-475.332525c0-150.445253-121.959434-272.404687-272.409858-272.404687"
          fill="#FE6A00"
          p-id="6643"
        />
        <path
          d="M272.409859-0.005172h360.654868L546.040242 123.185131 283.099798 203.719111A113.710545 113.710545 0 0 0 203.693253 312.883717v394.369293a113.710545 113.710545 0 0 0 79.411717 109.164606l262.930101 80.559839L633.069899 1020.167758H272.409859C121.959434 1020.147071 0 898.161778 0 747.711354v-475.332526C0 121.964606 121.959434 0.005172 272.409859 0.005172"
          fill="#FE6A00"
          p-id="6644"
        />
      </svg>
    );
    const IdaasSvg = () => (
      <svg
        t="1606461675119"
        viewBox="0 0 1639 1024"
        p-id="6641"
        width={size}
        height={size}
      >
        <g
          transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M120 735 c-5 -7 -14 -43 -19 -81 -24 -169 46 -356 175 -463 46 -37
     148 -90 184 -93 l25 -3 3 131 c2 124 1 132 -17 137 -11 3 -22 2 -25 -1 -3 -3
     -6 -50 -6 -104 0 -54 -4 -98 -8 -98 -20 0 -130 80 -169 122 -85 93 -116 187
     -111 337 1 60 6 107 11 104 4 -2 7 3 7 11 0 17 -36 18 -50 1z"
          />
          <path
            d="M1047 715 c4 -16 8 -80 8 -141 0 -107 -1 -112 -38 -186 -40 -82 -125
     -171 -197 -208 -47 -24 -50 -19 -50 84 0 73 0 73 -25 68 l-26 -4 3 -112 c3
     -108 4 -111 27 -114 33 -5 137 49 198 103 97 85 163 228 166 359 2 98 -10 169
     -28 162 -8 -3 -12 0 -9 7 3 8 -4 13 -16 13 -18 0 -20 -4 -13 -31z"
          />
          <path
            d="M660 491 c0 -4 -18 -7 -40 -5 l-40 3 2 -202 c3 -194 4 -202 23 -202
     19 0 20 8 23 170 l3 170 30 31 c25 26 27 32 15 37 -9 4 -16 3 -16 -2z"
          />
        </g>
      </svg>
    );
    if (item) {
      const { oauth_type: oauthType } = item;
      const map = {
        github: GithubSvg,
        gitlab: GitlabSvg,
        gitee: GiteeSvg,
        dingtalk: NailingSvg,
        aliyun: AliyunSvg,
        idaas: OauthSvg
      };
      return <Icon component={map[oauthType] || OauthSvg} />;
    }
    return null;
  },
  getGitOauthServer(wutongInfo, service_id, enterprise) {
    let selectServer = null;
    if (
      wutongUtil.OauthbEnable(wutongInfo) &&
      wutongUtil.OauthEnterpriseEnable(enterprise)
    ) {
      enterprise.oauth_services.value.map(item => {
        if (item.is_git && item.service_id == service_id) {
          selectServer = item;
        }
      });
    }
    return selectServer;
  },
  userbondOAuth(currentUser, service_id) {
    let isBond = false;
    if (currentUser) {
      // eslint-disable-next-line no-unused-expressions
      currentUser.oauth_services &&
        currentUser.oauth_services.map(item => {
          if (
            item.service_id == service_id &&
            item.is_authenticated &&
            !item.is_expired
          ) {
            isBond = true;
          }
        });
    }
    return isBond;
  }
};

export default oauthUtil;
