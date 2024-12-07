function TarotDrawSection() {
  return (
    <div className="relative text-center my-[40px] py-[40px]">
      <h3 className="text-[40px] py-2">
        Let the Cards Guide You, Choose One to Reveal Your Path
      </h3>
      <div className="py-12 flex justify-center space-x-8 overflow-x-hidden">
        {/* <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" />
        <img src={} alt="" /> */}
      </div>
      <div className="py-5 flex justify-center">
        <button className="rounded-[26px] bg-[#A88C26] py-[14px] px-[50px] text-white font-medium text-[20px]">
          Draw Your Fate
        </button>
      </div>
    </div>
  );
}

export default TarotDrawSection;