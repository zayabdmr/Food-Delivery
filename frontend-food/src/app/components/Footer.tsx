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
      title: ".",
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
      icons: ["fb.png", "ig.png"],
    },
  ];

  return (
    <div className="bg-[#18181B] w-full text-[#FAFAFA]">
      <div className="bg-[#EF4444] text-[24px] w-fit overflow-hidden md:text-[30px] font-semibold flex flex-wrap justify-center gap-x-[40px] px-[98px] py-[28px]">
        <div className="flex items-center justify-start w-fit text-nowrap gap-4">
          {Array(8)
            .fill("Fresh fast delivered")
            .map((text, i) => (
              <h2 key={i}>{text}</h2>
            ))}
        </div>
      </div>

      <div className="flex max-w-7xl px-[88px] pt-[76px] pb-[104px] gap-[112px]">
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
