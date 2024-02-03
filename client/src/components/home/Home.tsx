export default function Home() {
  return (
    <div className="  shadow-2xl flex  w-[80vw] self-start mt-[10%] border-2 border-black h-[60vh] flex-row-reverse overflow-auto max-lg:h-screen max-lg:w-screen">
      <div className="mr-10 flex flex-col  text-right gap-6 max-lg:mr-0">
        <h2 className=" text-4xl ">היי</h2>
        <h4 className=" text-2xl">
          העמוד הזה נועד לתת קצת הסבר על האתר והכלים שהיתשמשתי והמחשבה מאחוריי
          הבנייה
        </h4>
        <h5>
          וגם הסברים למה לקחתי את הדרך בניה הנוכחית <span>deployment</span>{" "}
          בעמוד הזה יש הסבר על הכלים שהישתמשתי והסבר על ה
        </h5>{" "}
        <div className=" flex flex-col gap-6 border-2 border-[#0000002d]">
          <h3 className="text-2xl">:הכלים לצד לקוח</h3>
          <h3 className=" text-xl">
            <span className="font-bold">react</span> ו{" "}
            <span className="font-bold">vite </span>האתר בנוי על
          </h3>{" "}
          <h3 className=" text-2xl">כלים נוספים</h3>
          <h3 className="  text-xl">routing :react router dom </h3>
          <h3 className="  text-xl">
            state management : redux and redux tool kit
          </h3>
          <h3 className="  text-xl">css framework : tailwind </h3>
          <h3 className="  text-xl">form validation : react hook form</h3>
        </div>
        <div className=" flex flex-col gap-6 border-2 border-[#0000002d]">
          <h3 className="text-2xl">: הכלים לצד שרת</h3>
          <h3>
            <span className="font-bold">Express</span> ו{" "}
            <span className="font-bold">Node js </span>
            השרת בנוי על
          </h3>{" "}
          <h3 className=" text-2xl">:כלים נוספים</h3>
          <h3 className="text-xl">orm: sequelize and tedious</h3>
          <h3 className="text-xl">cross origin resource sharing : cors</h3>
          <h3></h3>
        </div>
        <div className="flex flex-col gap-6 border-2 border-[#0000002d]">
          {" "}
          <h3 className="text-2xl">deployment</h3>
          <h2 className="text-xl">
            <span>varcel</span> הצד לקוח מוטמע ב
          </h2>
          <h2 className="text-xl">
            <span>azure linux server</span> הצד שרת מוטמע ב
          </h2>
        </div>
        <div className="flex flex-col gap-6 border-2 border-[#0000002d]">
          {" "}
          <h3 className="text-2xl">
            {" "}
            אני לקחתי דרך שמעמיסה את רוב החישובים בצד של הלקוח
          </h3>
          <h3>רציתי כמה שפחות בקשות לצד של השרת בישביל פידבק מיידי </h3>
          <h2 className="text-xl">עוד סיבה שלקחתי את הדרך הזאת</h2>
          <p>
            מסד נתונים די קטן והצד לקוח לא ירגיש בחישובים האלה ויקבל כמובן פידבק
            מיידי והשרת יעודכן בו זמנית
          </p>
          <p>כמובן במסד נתונים יותר גדול נעבור לחישובים בצד שרת</p>
          <p>
            אני רציתי להוסיף כניסה עם משתמש וסיסמה ושהיה שתי סוגים של משתמשים
            אדמין ויוסר
          </p>
          <p>
            האדמין יוכל לפרסם הודעה ו היוסר יוכל רק ליקרוא אותה אך לא היה לי זמן
            להוסיף את זה אבל <br />
            בדרך שהאתר בנוי כרגע לא היה בעיה להוסיף
          </p>
        </div>
      </div>
    </div>
  );
}
