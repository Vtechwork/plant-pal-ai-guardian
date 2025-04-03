
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sparkles, Brain, Cloud, ImagePlus, Bell } from "lucide-react";

const MarketingPitch = () => {
  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-plantGreen mb-2">Plant Pal AI</h1>
        <p className="text-xl text-muted-foreground">The Future of Plant Care is Personal</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="plant-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-plantGreen" />
              <CardTitle className="text-lg">AI-Powered Plant Care</CardTitle>
            </div>
            <CardDescription>Beyond generic plant advice</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Plant Pal AI goes beyond generic care tips by creating a detailed
              "digital twin" for each of your plants. By analyzing your specific
              environment, care history, and plant needs, our AI delivers
              hyper-personalized recommendations that generic apps simply can't match.
            </p>
          </CardContent>
        </Card>

        <Card className="plant-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-water" />
              <CardTitle className="text-lg">Digital Twin Technology</CardTitle>
            </div>
            <CardDescription>A virtual version of your plant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our breakthrough digital twin technology creates a virtual model of each
              plant that continuously learns from your care patterns, home environment,
              and external data like weather conditions. This ensures recommendations
              are perfectly tailored to your plant's unique situation.
            </p>
          </CardContent>
        </Card>

        <Card className="plant-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sunlight" />
              <CardTitle className="text-lg">Predictive Care</CardTitle>
            </div>
            <CardDescription>Anticipate needs before they arise</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Don't wait until your plant shows signs of distress. Plant Pal AI
              predicts your plants' needs before problems develop. From watering
              schedules to seasonal care adjustments, you'll always stay one step
              ahead in your plant care routine.
            </p>
          </CardContent>
        </Card>

        <Card className="plant-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-lg">Growth Tracking</CardTitle>
            </div>
            <CardDescription>Document your plant's journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Celebrate your plant parenting success with our visual growth
              tracking. Document your plant's journey with photos and watch as
              Plant Pal AI analyzes changes over time, helping you see progress
              and identify potential issues early.
            </p>
          </CardContent>
        </Card>

        <Card className="plant-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-danger" />
              <CardTitle className="text-lg">Try Plant Pal AI Today</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg">
              Join thousands of thriving plant parents who are experiencing unprecedented 
              success with our AI-powered plant care assistant.
              <span className="block mt-2 text-plantGreen font-semibold">
                Your plants deserve the best care technology can provide.
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingPitch;
