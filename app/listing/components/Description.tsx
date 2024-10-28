interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="mb-2 p-4 border shadow-md rounded-md shadow-gray-400">
      <p>{description}</p>
      <br />
      <p>{description}</p>
      <br />
      <p>{description}</p>
    </div>
  );
};

export default Description;
