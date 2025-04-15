const Footer = () => {
  const menuSections = [
    {
      title: "NOMNOM",
      items: ["Home", "Contact us", "Delivery zone"],
    },
    {
      title: "MENU",
      items: ["Appetizers", "Salads", "Pizzas", "Main dishes", "Desserts"],
    },
    {
      title: "    ",
      items: [
        "Side dish",
        "Brunch",
        "Desserts",
        "Beverages",
        "Fish & Sea foods",
      ],
    },
    {
      title: "FOLLOW US",
      icons: [
        "https://s3-alpha-sig.figma.com/img/51ce/951f/1825dc63909ca7d3c4ac0e5fb0a372ee?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZvTzlBmPiUAoG8jYKIyomCBtp7t-iy1-jwvcbkxywJLHGxKIDZY8THQ4fqXWUdHt3BNrr7ufvaBpHUD9CJEREfEnarXH0Bypkjeu7M3Ypsb4h9oBDBg~rghAR7~9LNt2dGtWpyGVd6gL2FZK-rplj1ocYaNmp77e5UsvpjGzTlnneGhFURua5rF8l8-x4a7bAVPAZdib7NHeA2mSuuS6MJsZhVEwuvVcX2nMvoVtTFXVBfdwNcwp7~y-mCrp3XLJnrfRHAc1pWkItm9b6E7l8IbD6jqMfjR~Lv5LoqS2cYtjjdz9RmZHbeBXknJniu76h2cYPGvUAuRHKeIIxiUlag__",
        "https://s3-alpha-sig.figma.com/img/2234/625a/4a532e2cfcc2c4f1e8bc4352831adc84?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qlcJcAosaACgw1tL10Mur2aaBIiDCxSHo6bLfBVT6Y~GmexDJz4YIhuM1WSsHDjqRVtgfkylJXMd2KprJbDpDpwrbIjyrnleSS9MVQSexzKngtKyhLCR1BAcCJPSLKFwMQs3rCASh9tNt~iZTEmWke0CAzQSqQvEpMTAi5Zwu7e7Ab8vMyS-e5RGHpnVuz45lJzZCUx-k6iry-F2VXYIgcwR7LqsC1aJ4a8sHJyngJYdENFJfdOlQWH7SrRhxGbqMZEKCwMAeNzgDF9Joo5Y3M8x0QP8MCpOwOlZld8-KlPGgOMpJ5qUWqV63V0ZQTZCA7Fryk0hKw2Mla9Fy67ZRQ__",
      ],
    },
  ];

  return (
    <div className="bg-[#18181B] w-full text-[#FAFAFA]">
      <div className="bg-[#EF4444] text-[24px] md:text-[30px] font-semibold flex flex-wrap justify-center gap-x-[40px] px-[98px] py-[28px]">
        {Array(4)
          .fill("Fresh fast delivered")
          .map((text, i) => (
            <h2 key={i}>{text}</h2>
          ))}
      </div>

      <div className="flex justify-between max-w-7xl px-[88px] pt-[76px] pb-[104px] gap-[112px]">
        <div className="min-w-[250px]">
          <img
            src="nomlogo.png"
            alt="NomNom Logo"
            className="w-[46px] h-[38px] mb-2"
          />
          <p className="text-[12px] text-[#F4F4F5]">Swift delivery</p>
        </div>

        {menuSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 min-w-[150px]">
            {section.title && (
              <p className="text-[#71717A] text-[16px] font-semibold mb-1">
                {section.title}
              </p>
            )}
            {section.items &&
              section.items.map((item, i) => (
                <p key={i} className="text-[16px]">
                  {item}
                </p>
              ))}
            {section.icons && (
              <div className="flex gap-4">
                {section.icons.map((icon, i) => (
                  <img
                    key={i}
                    src={icon}
                    alt="social"
                    className="w-[28px] h-[28px]"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="border-[#3F3F46] mx-[88px]" />

      <div className="text-[#71717A] text-[14px] flex px-[88px] py-[32px] gap-14">
        <div className="flex gap-1 items-center">
          <p>Copyright 2024</p>
          <p>©</p>
          <p>Nomnom LLC</p>
        </div>
        <div className="flex gap-14">
          <p>Privacy policy</p>
          <p>Terms and condition</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
