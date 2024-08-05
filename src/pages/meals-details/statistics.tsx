interface StatisticsProps {
  bgColor: string;
  amount: number;
  text: string;
}

const Statistics = ({ amount, bgColor, text }: StatisticsProps) => {
  return (
    <div className={`${bgColor} text-center py-4 rounded-lg`}>
      <span className="text-2xl font-bold">{amount}</span>
      <span className="text-lg block">{text}</span>
    </div>
  );
};

export default Statistics;
