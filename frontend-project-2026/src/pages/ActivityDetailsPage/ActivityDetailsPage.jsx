import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ActivityHeader from '../../components/layout/ActivityHeader/ActivityHeader';
import Breadcrumbs from '../../ui/Breadcrumbs/Breadcrumbs';
import NewsletterSection from '../../components/home/NewsletterSection/NewsletterSection';
import Footer from '../../components/layout/Footer/Footer';
import ActivityCard from '../../components/activities/ActivityCard/ActivityCard';
import { useActivity } from '../../hooks/useActivity';
import { useToast } from '../../hooks/useToast';
import { addActivityComment, upvoteActivityComment, removeUpvoteActivityComment, participateInActivity, donateToActivity } from '../../api/activitiesApi';
import Modal from '../../ui/Modal/Modal';
import ParticipateForm from '../../components/activities/ParticipateForm/ParticipateForm';
import DonationForm from '../../components/activities/DonationForm/DonationForm';
import SuccessView from '../../components/common/SuccessView/SuccessView';
import styles from './ActivityDetailsPage.module.css';

// Dummy related activities since there's no endpoint for them yet
const dummyRelatedActivities = [
    {
        id: 1,
        title: 'Кампания за безопасни улици',
        shortDescription: 'Инициатива за изграждане на велоалеи.',
        status: 'Отворен',
        type: 'Кампания',
        commentsCount: 21,
        cardImage: '/unsplash_x2j6lj09DhM.jpg',
    },
    {
        id: 2,
        title: 'Засаждане на дървета в парка',
        shortDescription: 'Еко инициатива за градско залесяване.',
        status: 'Отворен',
        type: 'Инициатива',
        commentsCount: 15,
        cardImage: '/unsplash_x2j6lj09DhM.jpg',
    }
];

function ActivityDetailsPage() {
    const { id } = useParams();
    const { activity, isLoading, error, refetch } = useActivity(id);
    const toast = useToast();
    const [commentText, setCommentText] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [upvotedComments, setUpvotedComments] = useState(new Set());
    
    const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false);
    const [isParticipating, setIsParticipating] = useState(false);
    const [participateError, setParticipateError] = useState(null);
    const [isParticipateSuccess, setIsParticipateSuccess] = useState(false);

    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [isDonating, setIsDonating] = useState(false);
    const [donationError, setDonationError] = useState(null);
    const [isDonationSuccess, setIsDonationSuccess] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !commentAuthor.trim()) {
            toast.warning('Моля, попълни всички полета.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await addActivityComment(id, { name: commentAuthor, opinion: commentText });
            setCommentText('');
            setCommentAuthor('');
            await refetch();
            toast.success('Коментарът е публикуван.');
        } catch (err) {
            const message = err.response?.data?.message || 'Грешка при публикуване.';
            setSubmitError(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpvote = async (commentId) => {
        const hasUpvoted = upvotedComments.has(commentId);
        try {
            if (hasUpvoted) {
                await removeUpvoteActivityComment(id, commentId);
                setUpvotedComments(prev => {
                    const next = new Set(prev);
                    next.delete(commentId);
                    return next;
                });
            } else {
                await upvoteActivityComment(id, commentId);
                setUpvotedComments(prev => {
                    const next = new Set(prev);
                    next.add(commentId);
                    return next;
                });
            }
            await refetch();
        } catch (err) {
            const message = err.response?.data?.message || 'Грешка при гласуване.';
            toast.error(message);
        }
    };

    const handleParticipate = async (values) => {
        setIsParticipating(true);
        setParticipateError(null);
        try {
            await participateInActivity(id, {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone
            });
            setIsParticipateSuccess(true);
            await refetch();
            toast.success('Записването е успешно.');
        } catch (err) {
            const message = err.response?.data?.message || 'Грешка при записване.';
            setParticipateError(message);
            toast.error(message);
        } finally {
            setIsParticipating(false);
        }
    };

    const handleDonation = async (values) => {
        setIsDonating(true);
        setDonationError(null);
        try {
            await donateToActivity(id, values);
            setIsDonationSuccess(true);
            await refetch();
            toast.success('Дарението е получено. Благодарим ти!');
        } catch (err) {
            const message = err.response?.data?.message || 'Грешка при дарение.';
            setDonationError(message);
            toast.error(message);
        } finally {
            setIsDonating(false);
        }
    };

    if (isLoading && !activity) {
        return (
            <div className={styles.pageWrapper}>
                <ActivityHeader />
                <main className={styles.mainContent}>
                    <p style={{ textAlign: 'center', padding: '100px 0' }}>Зареждане...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !activity) {
        return (
            <div className={styles.pageWrapper}>
                <ActivityHeader />
                <main className={styles.mainContent}>
                    <p style={{ textAlign: 'center', padding: '100px 0', color: 'red' }}>
                        {error || 'Активността не е намерена.'}
                    </p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroBackground}></div>
            
            <ActivityHeader />
            
            <main className={styles.mainContent}>
                <Breadcrumbs activityTitle={activity.title} />

                <div className={styles.headerLayout}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>{activity.title}</h1>
                        <p className={styles.description}>{activity.shortDescription}</p>
                    </div>
                    
                    <div className={styles.headerRight}>
                        <div className={styles.badges}>
                            <span className={styles.badgeBlack}>
                                <span className={styles.dotGreen}></span>
                                {activity.status}
                            </span>
                            <span className={styles.badgeLime}>
                                <img src="/leaf.svg" alt="" style={{width: 12, height: 12}} onError={(e) => e.target.style.display = 'none'} />
                                {activity.category}
                            </span>
                            <span className={styles.badgeOutline}>
                                <img src="/handshake.svg" alt="" style={{width: 12, height: 12}} onError={(e) => e.target.style.display = 'none'} />
                                {activity.type}
                            </span>
                            <span className={styles.badgeOutline}>
                                {activity.participantsCount} участника
                            </span>
                            <span className={styles.badgeOutline}>
                                💬 {activity.commentsCount || 0} коментара
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaBar}>
                    <button 
                        type="button" 
                        className={styles.btnPrimary}
                        onClick={() => setIsParticipateModalOpen(true)}
                    >
                        Включи се
                        <span className={styles.btnIconWrapper}>
                            <img src="/arrow.svg" alt="" className={styles.btnIcon} />
                        </span>
                    </button>
                    <button type="button" className={styles.btnOutline}>Сподели</button>
                    <button type="button" className={styles.btnLink}>Виж резултати</button>
                </div>

                <div className={styles.heroImageContainer}>
                    <picture>
                        <source srcSet="/activity-hero.png" />
                        <img src="/activity-hero.png" alt={activity.title} className={styles.heroImage} />
                    </picture>
                </div>

                <div className={styles.contentGrid}>
                    {/* LEFT COLUMN */}
                    <div className={styles.mainColumn}>
                        <div className={styles.contentCard}>
                            <div className={styles.textSection}>
                                <h2 className={styles.contentTitle}>За активността</h2>
                                {activity.longDescription?.map((p, i) => (
                                    <p key={i} className={styles.bodyText}>{p}</p>
                                ))}
                                
                                {activity.highlights && activity.highlights.length > 0 && (
                                    <ul className={styles.highlightList}>
                                        {activity.highlights.map((h, i) => (
                                            <li key={i} className={styles.highlightItem}>
                                                <span className={styles.checkIcon}>✓</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <hr className={styles.divider} />
                            
                            {/* DISCUSSION */}
                            <div className={styles.discussionSection}>
                                <div className={styles.discussionHeader}>
                                    <h3 className={styles.discussionTitle}>Дискусия</h3>
                                    <span className={styles.commentsCount}>{activity.commentsCount || 0} коментара</span>
                                </div>
                                
                                <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                                    <div className={styles.commentAvatar}></div>
                                    <div className={styles.commentInputWrapper}>
                                        <input 
                                            type="text" 
                                            placeholder="Твоето име" 
                                            value={commentAuthor}
                                            onChange={e => setCommentAuthor(e.target.value)}
                                            className={styles.commentAuthorInput}
                                            required
                                        />
                                        <textarea 
                                            placeholder="Сподели мнение, обсъди идеи..."
                                            value={commentText}
                                            onChange={e => setCommentText(e.target.value)}
                                            className={styles.commentTextarea}
                                            required
                                        />
                                        <div className={styles.commentFormFooter}>
                                            {submitError && <span className={styles.submitError}>{submitError}</span>}
                                            <button type="submit" className={styles.btnPrimarySmall} disabled={isSubmitting}>
                                                {isSubmitting ? 'Изпращане...' : 'Публикувай'}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className={styles.commentsList}>
                                    {activity.comments?.map(comment => (
                                        <div key={comment.id} className={styles.commentItem}>
                                            <div className={styles.commentAvatar}></div>
                                            <div className={styles.commentContent}>
                                                <div className={styles.commentMeta}>
                                                    <span className={styles.commentAuthor}>{comment.author}</span>
                                                    <span className={styles.commentRole}>{comment.role}</span>
                                                    <span className={styles.commentDate}>{new Date(comment.createdAt).toLocaleDateString('bg-BG')}</span>
                                                </div>
                                                <p className={styles.commentText}>{comment.text}</p>
                                                <div className={styles.commentActions}>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleUpvote(comment.id)}
                                                        style={{ color: upvotedComments.has(comment.id) ? 'var(--color-primary)' : '#6b6b60' }}
                                                    >
                                                        👍 {comment.upvotes || 0}
                                                    </button>
                                                    <button type="button">Отговори</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (SIDEBAR) */}
                    <aside className={styles.sidebar}>
                        <div className={styles.detailsCard}>
                            <h3 className={styles.sidebarTitle}>Детайли за активността</h3>
                            <ul className={styles.detailsList}>
                                <li><strong>Дата:</strong> {activity.date}</li>
                                <li><strong>Час:</strong> {activity.startTime} - {activity.endTime}</li>
                                <li><strong>Локация:</strong> {activity.location?.address || 'Онлайн'}</li>
                                <li><strong>Организатор:</strong> {activity.organizer?.name}</li>
                            </ul>
                            <div className={styles.progressSection}>
                                <span>Участват {activity.participantsCount} от {activity.maxParticipants}</span>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={styles.progressFill} 
                                        style={{ width: `${Math.min(100, (activity.participantsCount / activity.maxParticipants) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.volunteerCard}>
                            <h3 className={styles.volunteerTitle}>Стани доброволец – включи се сега!</h3>
                            <p className={styles.volunteerText}>Всяка ръка е полезна, включи се сега!</p>
                            <button 
                                type="button" 
                                className={styles.btnLime}
                                onClick={() => setIsParticipateModalOpen(true)}
                            >
                                Включи се <img src="/arrow.svg" alt="" style={{width: 12}} />
                            </button>
                        </div>

                        <div className={styles.donateCard}>
                            <h3 className={styles.donateTitle}>Направи дарение</h3>
                            <p className={styles.donateText}>Подкрепи ни финансово.</p>
                            <div className={styles.donatePills}>
                                <button type="button" onClick={() => setIsDonationModalOpen(true)}>5 €</button>
                                <button type="button" onClick={() => setIsDonationModalOpen(true)}>10 €</button>
                                <button type="button" onClick={() => setIsDonationModalOpen(true)}>20 €</button>
                            </div>
                            <button 
                                type="button" 
                                className={styles.btnBlack}
                                onClick={() => setIsDonationModalOpen(true)}
                            >
                                Дари сега <img src="/arrow.svg" alt="" style={{width: 12, filter: 'invert(1)'}} />
                            </button>
                        </div>
                    </aside>
                </div>

                <section className={styles.moreActivities}>
                    <h2 className={styles.moreTitle}>Още активности</h2>
                    <div className={styles.activitiesList}>
                        {dummyRelatedActivities.map(act => (
                            <ActivityCard key={act.id} activity={act} />
                        ))}
                    </div>
                </section>
            </main>
            
            <NewsletterSection />
            <Footer />

            <Modal
                isOpen={isParticipateModalOpen}
                onClose={() => {
                    setIsParticipateModalOpen(false);
                    setIsParticipateSuccess(false);
                }}
                ariaLabel="Включи се в инициативата"
            >
                {isParticipateSuccess ? (
                    <SuccessView
                        message="ВАШЕТО ЗАПИСВАНЕ Е УСПЕШНО"
                        title="Благодарим ВИ!"
                        onClose={() => {
                            setIsParticipateModalOpen(false);
                            setIsParticipateSuccess(false);
                        }}
                    />
                ) : (
                    <ParticipateForm
                        isSubmitting={isParticipating}
                        submitError={participateError}
                        onSubmit={handleParticipate}
                        onCancel={() => setIsParticipateModalOpen(false)}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isDonationModalOpen}
                onClose={() => {
                    setIsDonationModalOpen(false);
                    setIsDonationSuccess(false);
                }}
                ariaLabel="Направи дарение"
            >
                {isDonationSuccess ? (
                    <SuccessView
                        message="ВАШЕТО ДАРЕНИЕ Е ОТРАЗЕНО УСПЕШНО"
                        title="Благодарим ВИ!"
                        onClose={() => {
                            setIsDonationModalOpen(false);
                            setIsDonationSuccess(false);
                        }}
                    />
                ) : (
                    <DonationForm
                        isSubmitting={isDonating}
                        onSubmit={handleDonation}
                    />
                )}
            </Modal>
        </div>
    );
}

export default ActivityDetailsPage;