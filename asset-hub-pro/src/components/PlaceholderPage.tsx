import { motion } from "framer-motion";
import { Construction } from "lucide-react";

const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-4">
        <Construction className="h-7 w-7 text-muted-foreground" />
      </div>
      <h1 className="text-xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
    </motion.div>
  </div>
);

export default PlaceholderPage;
