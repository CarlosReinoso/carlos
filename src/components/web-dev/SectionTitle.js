import Typography from "../common/Typography";

export default function SectionTitle({ children }) {
  return (
    <Typography variant="h6" className="mb-12 md:mb-8 mt-32">
      {children}
    </Typography>
  );
}
