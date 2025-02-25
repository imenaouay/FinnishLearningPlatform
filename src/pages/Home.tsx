import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 animate-slide-down">
          Master Finnish Language
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
          Learn Finnish through interactive lessons, practice exercises, and earn certificates
          as you progress.
        </p>
        <Link
          to="/lessons"
          className="inline-block btn-primary px-8 py-3 text-lg animate-scale-in"
        >
          Start Learning
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard
          icon={<BookOpen className="h-8 w-8 text-blue-600" />}
          title="Structured Learning"
          description="Progressive lessons from beginner to advanced levels"
          delay="delay-100"
        />
        <FeatureCard
          icon={<Award className="h-8 w-8 text-blue-600" />}
          title="Earn Certificates"
          description="Get certified upon completing course levels"
          delay="delay-200"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-blue-600" />}
          title="Community Learning"
          description="Learn together with other students"
          delay="delay-300"
        />
      </section>

      <section className="bg-blue-50 rounded-2xl p-8 max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl font-bold text-center mb-6">Why Learn Finnish with Us?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h3 className="font-semibold text-lg mb-2">Interactive Lessons</h3>
            <p className="text-gray-600">
              Engage with multimedia content and real-time feedback to enhance your learning experience.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your advancement with detailed progress tracking and achievement badges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}> = ({ icon, title, description, delay }) => {
  return (
    <div className={`feature-card animate-slide-up ${delay}`}>
      <div className="inline-block p-3 bg-blue-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;