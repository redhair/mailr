// Email HTML body
export const html = ({ name }) => {
  // Some simple styling options
  const backgroundColor = '#f9f9f9';
  const textColor = '#000000';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#0070f3';
  const buttonBorderColor = '#0070f3';
  const buttonTextColor = '#ffffff';

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <p>Congrats! ${name} 🎉</p>
        <p>You have a new subscriber on your mailing list!</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 50px;" bgcolor="${buttonBackgroundColor}"><a href="https://mailr.link/dashboard/subscribers" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 50px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">View Subscribers</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 12px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not want these updates you can <a href="https://mailr.link/dashboard/settings">unsubscribe</a>.
      </td>
    </tr>
  </table>
</body>
`;
};

// Email text body – fallback for email clients that don't render HTML
export const text = ({ name }) =>
  `Congrats ${name}! You have a new subscriber on mailr.link, visit this url to view your all of your subscribers\nhttps://mailr.link/dashboard/subscribers\n\n`;
