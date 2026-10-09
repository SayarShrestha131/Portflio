import React, { useRef, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import "./global.css";

const skillGroups = [
  ["Web development", ["HTML", "CSS"]],
  ["Programming languages", ["JavaScript", "Java"]],
  ["Mobile development", ["React Native"]],
  ["Database", ["MongoDB"]],
  ["UI/UX design", ["Figma"]],
];

const services = [
  ["Mobile development", "Building user-friendly mobile applications with React Native."],
  ["Web development", "Creating responsive websites with HTML, CSS, and JavaScript."],
  ["UI/UX design", "Designing clear and intuitive interfaces with Figma."],
  ["Database management", "Working with MongoDB to store and manage application data."],
];

const navItems = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["what-i-do", "What I do"],
  ["education", "Education"],
  ["resume", "CV"],
  ["contact", "Contact"],
];

function SectionTitle({ title, note }) {
  return (
    <View className="mb-8 border-b border-line pb-5 md:mb-12 md:flex-row md:items-end md:justify-between">
      <Text className="font-display text-3xl font-semibold text-ink">{title}</Text>
      {note ? <Text className="mt-3 max-w-sm text-sm leading-6 text-muted md:mt-0 md:text-right">{note}</Text> : null}
    </View>
  );
}

export default function App() {
  const scrollRef = useRef(null);
  const sectionOffsets = useRef({});
  const [activeSection, setActiveSection] = useState("home");
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  const shareCV = async () => {
    try {
      const cvAsset = Asset.fromModule(require("./CV/Sayar_Shrestha_CV.pdf"));
      await cvAsset.downloadAsync();
      if (!cvAsset.localUri) throw new Error("CV file is unavailable");
      await Sharing.shareAsync(cvAsset.localUri, {
        mimeType: "application/pdf",
        UTI: "com.adobe.pdf",
        dialogTitle: "Save or share my CV",
      });
    } catch {
      Alert.alert("Could not open CV", "Please try again or download the PDF from the web portfolio.");
    }
  };

  const goTo = (section) => {
    setActiveSection(section);
    scrollRef.current?.scrollTo({ y: sectionOffsets.current[section] || 0, animated: true });
  };
  const markSection = (section) => ({
    onLayout: (event) => { sectionOffsets.current[section] = event.nativeEvent.layout.y; },
  });

  return (
    <View className="flex-1 bg-paper">
      <StatusBar style="dark" />
      <ScrollView ref={scrollRef} className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="border-b border-line bg-paper px-5 py-4 md:px-10">
          <View className={`mx-auto w-full max-w-6xl ${isWide ? "flex-row items-center justify-between" : ""}`}>
            <Pressable onPress={() => goTo("home")} accessibilityRole="button" accessibilityLabel="Back to top">
              <Text className="font-display text-lg font-semibold text-ink">Sayar Shrestha<Text className="text-coral">.</Text></Text>
            </Pressable>
            <View className="mt-4 flex-row flex-wrap gap-x-5 gap-y-3 md:mt-0">
              {navItems.map(([key, label]) => (
                <Pressable key={key} onPress={() => goTo(key)} accessibilityRole="button">
                  <Text className={`text-sm ${activeSection === key ? "font-semibold text-ink" : "text-muted"}`}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View {...markSection("home")} className="border-b border-line px-5 py-12 md:min-h-[620px] md:justify-center md:px-10 md:py-20">
          <View className={`mx-auto w-full max-w-6xl ${isWide ? "flex-row items-center justify-between gap-12" : ""}`}>
            <View className={isWide ? "flex-1" : ""}>
              <Text className="mb-4 text-sm font-medium text-muted">BSc (Hons) COMPUTER SCIENCE GRADUATE</Text>
              <Text className="font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">Hi, I’m Sayar Shrestha.</Text>
              <Text className="mt-3 font-display text-xl font-medium text-cobalt">Junior Software Developer</Text>
              <Text className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg">I build responsive web and mobile applications with a focus on clean design, usability, and practical solutions.</Text>
              <View className="mt-7 flex-row flex-wrap items-center gap-5">
                <Pressable onPress={() => goTo("projects")} className="bg-ink px-5 py-3.5" accessibilityRole="button">
                  <Text className="text-sm font-semibold text-paper">View my projects  ↘</Text>
                </Pressable>
                <Pressable onPress={() => goTo("contact")} accessibilityRole="button">
                  <Text className="border-b border-ink py-3 text-sm font-medium text-ink">Let’s connect</Text>
                </Pressable>
                <Pressable onPress={shareCV} className="border border-line px-4 py-3" accessibilityRole="button">
                  <Text className="text-sm font-medium text-ink">Download CV</Text>
                </Pressable>
              </View>
            </View>
            <View className={`mt-10 h-72 w-full overflow-hidden border border-line bg-card md:h-[400px] ${isWide ? "mt-0 flex-1" : ""}`}>
              <Image source={require("./Image/20260707_190008.jpg")} className="h-full w-full" resizeMode="cover" accessibilityLabel="Portrait of the portfolio owner" />
              <View className="absolute bottom-4 left-4 border border-line bg-card px-4 py-3">
                <Text className="text-xs font-semibold tracking-widest text-ink">JUNIOR DEVELOPER</Text>
              </View>
            </View>
          </View>
        </View>

        <View {...markSection("about")} className="px-5 py-16 md:px-10 md:py-24">
          <View className="mx-auto w-full max-w-6xl">
            <SectionTitle title="About me" note="Computer science graduate · Junior software developer" />
            <View className={isWide ? "flex-row gap-14" : ""}>
              <View className={isWide ? "flex-1" : ""}>
                <Text className="text-base leading-7 text-muted">I am a BSc (Hons) Computer Science graduate from Herald College Kathmandu, a UK-affiliated college. I’m passionate about software and application development, with a foundation in web and mobile development, databases, and UI/UX design.</Text>
                <Text className="mt-4 text-base leading-7 text-muted">My final-year project was a Vehicle Rent Management System built with React Native, JavaScript, and MongoDB. I enjoy learning new technologies, building practical projects, and growing as a software developer.</Text>
              </View>
              <View className="mt-7 border-t-2 border-cobalt pt-5 md:mt-0 md:flex-1">
                <Text className="font-display text-lg font-semibold text-ink">Currently looking for opportunities</Text>
                <Text className="mt-3 text-sm leading-6 text-muted">I’m seeking a junior software development role where I can contribute to real-world projects and continue learning.</Text>
              </View>
            </View>
          </View>
        </View>

        <View {...markSection("skills")} className="border-y border-line bg-card px-5 py-16 md:px-10 md:py-24">
          <View className="mx-auto w-full max-w-6xl">
            <SectionTitle title="Technical skills" note="Tools and technologies I’ve worked with" />
            <View className={isWide ? "flex-row flex-wrap justify-between gap-y-8" : ""}>
              {skillGroups.map(([category, items]) => (
                <View key={category} className="mb-6 border-t-2 border-cobalt pt-4 md:mb-0 md:w-[30%]">
                  <Text className="mb-3 font-display text-lg font-semibold text-ink">{category}</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {items.map((item) => <View key={item} className="border border-line bg-paper px-3 py-2"><Text className="text-sm text-ink">{item}</Text></View>)}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View {...markSection("projects")} className="px-5 py-16 md:px-10 md:py-24">
          <View className="mx-auto w-full max-w-6xl">
            <SectionTitle title="Featured project" note="Final-year project · BSc (Hons) Computer Science" />
            <View className={isWide ? "flex-row items-center gap-10" : ""}>
              <View className={`h-64 overflow-hidden border border-line bg-card md:h-80 ${isWide ? "flex-1" : ""}`}>
                <View className="flex-1 justify-between bg-ink p-6 md:p-8">
                  <Text className="text-xs font-semibold tracking-widest text-paper">FINAL-YEAR PROJECT / MOBILE APPLICATION</Text>
                  <Text className="font-display text-4xl font-semibold leading-tight text-paper md:text-5xl">Vehicle{"\n"}Rental{"\n"}<Text className="text-coral">Management</Text></Text>
                  <Text className="border-t border-line pt-3 text-xs tracking-widest text-paper">REACT NATIVE · JAVASCRIPT · MONGODB</Text>
                </View>
              </View>
              <View className={`mt-7 ${isWide ? "mt-0 flex-1" : ""}`}>
                <Text className="text-xs font-semibold tracking-widest text-cobalt">REACT NATIVE · JAVASCRIPT · MONGODB · FIGMA</Text>
                <Text className="mt-3 font-display text-2xl font-semibold text-ink">Vehicle Rent Management System</Text>
                <Text className="mt-4 text-sm leading-6 text-muted">A mobile-based vehicle rental management application developed as my final-year project. It was designed to simplify rental management by providing a digital place to manage vehicle and rental-related information.</Text>
                <Text className="mt-5 font-display text-base font-semibold text-ink">My contribution</Text>
                <Text className="mt-2 text-sm leading-6 text-muted">Application design and development, mobile interface implementation, database integration, and testing of core functionality.</Text>
                <Text className="mt-4 text-xs leading-5 text-muted">Concept cover; project screenshots and verified feature details can be added here.</Text>
              </View>
            </View>
          </View>
        </View>

        <View {...markSection("what-i-do")} className="border-y border-line bg-card px-5 py-16 md:px-10 md:py-24">
          <View className="mx-auto w-full max-w-6xl">
            <SectionTitle title="What I do" />
            <View className={isWide ? "flex-row flex-wrap justify-between gap-y-8" : ""}>
              {services.map(([title, description]) => (
                <View key={title} className="mb-6 border-t-2 border-coral pt-4 md:mb-0 md:flex-1">
                  <Text className="font-display text-lg font-semibold text-ink">{title}</Text>
                  <Text className="mt-2 text-sm leading-6 text-muted">{description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View {...markSection("education")} className="px-5 py-16 md:px-10 md:py-24">
          <View className="mx-auto w-full max-w-6xl">
            <SectionTitle title="Education" />
            <View className="pt-6">
              <Text className="font-display text-xl font-semibold text-ink">BSc (Hons) Computer Science · Third Class Honours</Text>
              <Text className="mt-2 text-sm text-muted">Herald College Kathmandu · UK-affiliated · 2023–2026</Text>
              <Text className="mt-3 text-sm text-muted">Final-year project: Vehicle Rent Management System</Text>
            </View>
          </View>
        </View>

        <View {...markSection("resume")} className="border-y border-line bg-card px-5 py-10 md:px-10">
          <View className={`mx-auto w-full max-w-6xl ${isWide ? "flex-row items-center justify-between" : "gap-3"}`}>
            <View>
              <Text className="font-display text-xl font-semibold text-ink">Resume / CV</Text>
              <Text className="mt-1 text-sm text-muted">Open the PDF to save or share a copy.</Text>
            </View>
            <Pressable onPress={shareCV} className="self-start bg-ink px-5 py-3" accessibilityRole="button">
              <Text className="text-sm font-semibold text-paper">Download CV</Text>
            </Pressable>
          </View>
        </View>

        <View {...markSection("contact")} className="border-y border-line bg-cobalt px-5 py-14 md:px-10 md:py-20">
          <View className={`mx-auto w-full max-w-6xl ${isWide ? "flex-row items-end justify-between gap-8" : ""}`}>
            <View className={isWide ? "flex-1" : ""}>
              <Text className="font-display text-3xl font-semibold leading-tight text-paper md:text-5xl">Let’s work together</Text>
              <Text className="mt-4 max-w-xl text-sm leading-6 text-paper">I’m looking for opportunities to start my career in software development and contribute to real-world applications.</Text>
            </View>
            <View className="mt-8 gap-3 md:mt-0">
              <Pressable onPress={() => Linking.openURL("mailto:dynamicpc8@gmail.com")} accessibilityRole="link">
                <Text className="text-base font-semibold text-paper">Email: dynamicpc8@gmail.com ↗</Text>
              </Pressable>
              <Pressable onPress={() => Linking.openURL("https://github.com/SayarShrestha131")} accessibilityRole="link">
                <Text className="text-sm text-paper">GitHub: SayarShrestha131 ↗</Text>
              </Pressable>
              <Text className="text-sm text-paper">Location: Tokha, Kathmandu</Text>
            </View>
          </View>
        </View>

        <View className="px-5 py-6 md:px-10">
          <View className={`mx-auto w-full max-w-6xl ${isWide ? "flex-row justify-between" : "gap-2"}`}>
            <Text className="text-xs text-muted">Sayar Shrestha · Junior Software Developer</Text>
            <Text className="text-xs text-muted">Portfolio · 2026</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
