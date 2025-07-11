import { Button } from "@/components/ui/button";

export const Dashboard = () => {
   // const isActive = 'default'

   return (
      <>
         <h1 className="text-xl">Admin Dashboard</h1>
         <Button variant={"default"}>Aprentices</Button>
         <Button variant={"secondary"}>Categories</Button>
      </>
   );
};
